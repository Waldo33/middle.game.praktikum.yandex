import { Card } from './CardClass'
import { loadImage } from './helpers/loadImage'
import { shuffle } from './helpers/shuffleArrayItems'
import { Player } from './PlayerClass'

type Options = {
  rows?: number
  columns?: number
  cardWidth: number
  cardHeight: number
  padding: number
}

export class GameBoard {
  private cards: Card[] = []
  private ctx: CanvasRenderingContext2D
  private selectedCards: Card[] = []
  private grid: Card[][] = []
  private rows: number
  private columns: number
  private cardWidth: number
  private cardHeight: number
  private padding: number

  constructor(
    ctx: CanvasRenderingContext2D,
    { rows = 4, columns = 4, cardWidth, cardHeight, padding }: Options
  ) {
    if (rows % 2 === 1 && columns % 2 === 1) {
      throw new Error('Column or row count must be even number!')
    }

    this.ctx = ctx
    this.rows = rows
    this.columns = columns
    this.cardWidth = cardWidth
    this.cardHeight = cardHeight
    this.padding = padding
    this.setupBoard()
  }

  private async createCardPairs() {
    const images = await this.loadImages()
    const cardPairs: Card[] = []

    images.forEach((image, index) => {
      cardPairs.push(new Card(index, image, this), new Card(index, image, this))
    })

    return cardPairs
  }

  public async setupBoard() {
    const cardPairs = await this.createCardPairs()
    this.cards = this.shuffle(cardPairs)
    this.grid = this.createGrid(this.cards)
    this.render()
  }

  public checkAllCardsMatched(): boolean {
    return this.cards.every(card => card.checkMatched())
  }

  /**
   * @todo В будущем карточки со ссылками на изображения должны приходить с бэкенда
   */
  private async loadImages(): Promise<HTMLImageElement[]> {
    const imageSources = Array.from(
      { length: (this.rows * this.columns) / 2 },
      (_, i) => i + 1
    ).map(value => `assets/images/cards/${value}.png`)

    return await Promise.all(imageSources.map(loadImage))
  }

  private shuffle(cards: Card[]): Card[] {
    return shuffle(cards)
  }

  private isMaxCardsSelected(): boolean {
    return this.selectedCards.length === 2
  }

  public handleCardClick(position: { x: number; y: number }, player: Player) {
    if (this.isMaxCardsSelected()) {
      return null
    }

    const clickedCard = this.getCardAtPosition(position)

    if (!clickedCard) {
      return null
    }

    const isRevealed = clickedCard.checkRevealed()

    if (!isRevealed) {
      clickedCard.reveal()
      this.selectedCards.push(clickedCard)
    }

    if (!isRevealed && this.isMaxCardsSelected()) {
      this.checkForMatch(player)
    }

    this.render()
  }

  private createGrid(cards: Card[]): Card[][] {
    const grid: Card[][] = []
    let cardIndex = 0

    for (let row = 0; row < this.rows; row++) {
      const rowCards: Card[] = []
      for (let col = 0; col < this.columns; col++) {
        if (cardIndex < cards.length) {
          rowCards.push(cards[cardIndex])
          cardIndex++
        }
      }
      grid.push(rowCards)
    }

    return grid
  }

  private getCardAtPosition(position: { x: number; y: number }): Card | null {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const card = this.grid[row][col]
        const x = col * (this.cardWidth + this.padding)
        const y = row * (this.cardHeight + this.padding)

        if (
          position.x >= x &&
          position.x <= x + this.cardWidth &&
          position.y >= y &&
          position.y <= y + this.cardHeight
        ) {
          return card
        }
      }
    }
    return null
  }

  /**
   * Метод для проверки совпадения среди 2 выбранных карточек
   */
  private checkForMatch(player: Player) {
    const [card1, card2] = this.selectedCards
    if (card1.checkMatch(card2)) {
      card2.checkMatch(card1)
      player.addPoint()
      this.selectedCards = []
    } else {
      setTimeout(() => {
        card1.hide()
        card2.hide()
        this.selectedCards = []
        this.render()
      }, 1000)
    }
  }

  private highlightCard(card: Card) {
    card.highlight()
  }

  private clearHighlight() {
    this.cards.forEach(card => card.clearHighlight())
  }

  public handleHover(position: { x: number; y: number }) {
    this.clearHighlight()
    const card = this.getCardAtPosition(position)

    if (card) {
      this.highlightCard(card)
    }

    this.render()
  }

  public render() {
    console.log('board')
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)

    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        const card = this.grid[row][col]
        const x = col * (this.cardWidth + this.padding) + this.padding / 2
        const y = row * (this.cardHeight + this.padding) + this.padding / 2
        card.draw(this.ctx, x, y, this.cardWidth, this.cardHeight)
      }
    }
  }
}
