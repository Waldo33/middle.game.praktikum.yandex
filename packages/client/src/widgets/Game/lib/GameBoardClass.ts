import { Card } from './CardClass'
import { loadImage } from './helpers/loadImage'
import { shuffle } from './helpers/shuffleArrayItems'

type Options = {
  rows?: number
  columns?: number
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
  private canvas: HTMLCanvasElement

  constructor(
    canvas: HTMLCanvasElement,
    { rows = 4, columns = 4, padding = 4 }: Options
  ) {
    if (rows % 2 === 1 && columns % 2 === 1) {
      throw new Error('Column or row count must be even number!')
    }

    this.canvas = canvas
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Error creating 2D context.')
    }

    const cardSize = 95

    canvas.width = columns * (cardSize + padding)
    canvas.height = rows * (cardSize + padding)

    this.ctx = ctx
    this.rows = rows
    this.columns = columns
    this.cardWidth = cardSize
    this.cardHeight = cardSize
    this.padding = padding
    this.setupBoard()
  }

  private async createCardPairs() {
    const images = await this.loadImages()
    const cardPairs: Card[] = []

    images.forEach((image, index) => {
      cardPairs.push(new Card(index, image), new Card(index, image))
    })

    return cardPairs
  }

  public async setupBoard() {
    const cardPairs = await this.createCardPairs()
    this.cards = this.shuffle(cardPairs)
    this.grid = this.createGrid(this.cards)
    this.render()
  }

  public getCards() {
    return this.cards
  }

  public getSelectedCards() {
    return this.selectedCards
  }

  public checkAllCardsMatched(): boolean {
    return this.cards.every(card => card.checkMatched())
  }

  public checkSelectedCardsMatched(): boolean {
    const [card1, card2] = this.getSelectedCards()
    if (card1 && card2 && card1.checkMatch(card2)) {
      card2.checkMatch(card1)
      return true
    }

    return false
  }

  public addSelectedCard(card: Card): void {
    this.selectedCards.push(card)
  }

  public deleteSelectedCards(): void {
    this.selectedCards = []
  }

  public clean() {
    this.cards.forEach((card: Card) => card.clearHighlight())
    this.selectedCards.forEach((card: Card) => card.hide())
    this.deleteSelectedCards()
    this.render()
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

  public isMaxCardsSelected(): boolean {
    return this.selectedCards.length === 2
  }

  private shuffle(cards: Card[]): Card[] {
    return shuffle(cards)
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

  public getCardAtPosition(position: { x: number; y: number }): Card | null {
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

  public highlightCard(card: Card) {
    card.highlight()
  }

  public clearHighlight() {
    this.cards.forEach(card => card.clearHighlight())
  }

  public getEventPosition(event: MouseEvent | TouchEvent): {
    x: number
    y: number
  } {
    const rect = this.canvas.getBoundingClientRect()
    const x =
      event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    const y =
      event instanceof MouseEvent ? event.clientY : event.touches[0].clientY
    return { x: x - rect.left, y: y - rect.top }
  }

  public render() {
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
