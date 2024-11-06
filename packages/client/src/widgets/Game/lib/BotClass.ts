import { NumberFromOneToTen } from '@pages/GamePage/ui/GamePage'
import { Card } from './CardClass'
import { GameBoard } from './GameBoardClass'

import { GameEventBus, GameEventBusType } from './GameEventBus'
import { Round } from './RoundClass'

export class Bot {
  private interval?: NodeJS.Timeout
  private score = 0
  private id: number
  private difficalty: NumberFromOneToTen
  private bus: GameEventBusType
  private gameBoard: GameBoard
  private round: Round
  private liquidDifficalty: NumberFromOneToTen | 0 | number = 0
  private name = 'Бот'

  constructor(
    id: number,
    difficalty: NumberFromOneToTen,
    gameBoard: GameBoard,
    round: Round
  ) {
    this.id = id
    this.bus = GameEventBus.getInstance()
    this.difficalty = difficalty
    this.gameBoard = gameBoard
    this.round = round
  }

  public getName(): string {
    return this.name
  }

  public getId(): number {
    return this.id
  }

  public addPoint(): void {
    this.score += 1
    this.bus.emit('bot-score-update', this.score)
  }

  public checkForMatch(): void {
    if (this.gameBoard.checkSelectedCardsMatched()) {
      this.addPoint()
      this.gameBoard.deleteSelectedCards()
      this.round.resetTime()
      this.chooseCards()
    } else {
      setTimeout(() => {
        this.round.switchTurn()
      }, 3000)
    }
  }

  private showCards(card1: Card, card2: Card) {
    this.interval = setInterval(() => {
      if (card1.checkRevealed()) {
        card2.reveal()
        this.gameBoard.addSelectedCard(card2)
        this.checkForMatch()
        this.gameBoard.render()
        clearInterval(this.interval)
      }

      if (!card2.checkRevealed()) {
        card1.reveal()
        this.gameBoard.addSelectedCard(card1)
        this.gameBoard.render()
      }
    }, 2000)
  }

  public chooseCards() {
    let calculatedDifficalty = 0

    // Фильтруем карты, которые еще не совпали
    const unmatchedCards: Card[] = this.gameBoard
      .getCards()
      .filter(card => !card.checkMatched())

    // При уменьшении количества закрытых пар увеличиваем сложность
    if (
      this.gameBoard.getCards().length / 2 < unmatchedCards.length &&
      this.liquidDifficalty < 7
    ) {
      calculatedDifficalty = this.liquidDifficalty + 2
    }
    if (
      this.gameBoard.getCards().length / 3 < unmatchedCards.length &&
      this.liquidDifficalty < 6
    ) {
      calculatedDifficalty = this.liquidDifficalty + 3
    }

    // Увеличиваем вероятность открытия для карт, которые были открыты ранее
    // const weightedCards = unmatchedCards.flatMap((card: Card) =>
    //   card.checkTouched() ? [card, card] : [card]
    // )

    const weightedCards = unmatchedCards

    // Перемешиваем массив, чтобы случайным образом выбирать карты
    weightedCards.sort(() => Math.random() - 0.5)

    // Вероятность, которая рассчитывается по уровню сложности игры и нарастающей сложности при открытии пар подряд
    calculatedDifficalty = this.difficalty - this.liquidDifficalty
    const probability = calculatedDifficalty >= 1 ? calculatedDifficalty : 1
    const randomProbability = Math.random() * 10

    // Пытаемся найти совпадающие пары
    for (let i = 0; i < weightedCards.length; i++) {
      for (let j = i + 1; j < weightedCards.length; j++) {
        if (
          weightedCards[i].getId() === weightedCards[j].getId() &&
          randomProbability < probability
        ) {
          this.liquidDifficalty++
          this.showCards(weightedCards[i], weightedCards[j])

          return
        }
      }
    }

    // Если совпадения не найдено, выбираем любые две случайные карты
    const randomPair = weightedCards.slice(0, 2)

    if (randomPair.length === 2) {
      this.liquidDifficalty = 0
      this.showCards(randomPair[0], randomPair[1])
      return
    }
  }
}
