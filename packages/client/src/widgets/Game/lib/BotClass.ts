import { Difficulty } from '@pages/GamePage/ui/GamePage'
import { Card } from './CardClass'
import { GameBoard } from './GameBoardClass'

import { GameEventBus, GameEventBusType } from './GameEventBus'
import { Round } from './RoundClass'

export class Bot {
  private interval?: NodeJS.Timeout
  private score = 0
  private id: number
  private difficulty: Difficulty
  private bus: GameEventBusType
  private gameBoard: GameBoard
  private round: Round
  private liquidDifficulty: Difficulty | 0 | number = 0
  private name = 'Бот'

  constructor(
    id: number,
    difficulty: Difficulty,
    gameBoard: GameBoard,
    round: Round
  ) {
    this.id = id
    this.bus = GameEventBus.getInstance()
    this.difficulty = difficulty
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

  private showCards(card1: Card, card2: Card) {
    this.interval = setInterval(() => {
      if (card1.checkRevealed()) {
        card2.reveal()
        this.gameBoard.addSelectedCard(card2)
        clearInterval(this.interval)
        this.gameBoard.render()
        this.round.checkForMatch()
      }

      if (!card2.checkRevealed()) {
        card1.reveal()
        this.gameBoard.addSelectedCard(card1)
        this.gameBoard.render()
      }
    }, 2000)
  }

  public chooseCards() {
    let calculatedDifficulty = 0

    // Фильтруем карты, которые еще не совпали
    const unmatchedCards: Card[] = this.gameBoard
      .getCards()
      .filter(card => !card.checkMatched())

    // Увеличиваем вероятность открытия для карт, которые были открыты ранее
    const weightedCards = unmatchedCards.flatMap((card: Card) =>
      card.checkTouched() ? [card, card] : [card]
    )

    // Перемешиваем массив, чтобы случайным образом выбирать карты
    weightedCards.sort(() => Math.random() - 0.5)

    // Вероятность, которая рассчитывается по уровню сложности игры и нарастающей сложности при открытии пар подряд
    calculatedDifficulty = this.difficulty - this.liquidDifficulty

    // При уменьшении количества закрытых пар увеличиваем сложность
    if (unmatchedCards.length === 2) {
      calculatedDifficulty = 10
    } else if (
      this.gameBoard.getCards().length / 3 > unmatchedCards.length &&
      this.liquidDifficulty < 6
    ) {
      calculatedDifficulty = calculatedDifficulty + 3
    } else if (
      this.gameBoard.getCards().length / 2 > unmatchedCards.length &&
      this.liquidDifficulty < 7
    ) {
      calculatedDifficulty = calculatedDifficulty + 2
    }

    const probability = calculatedDifficulty >= 1 ? calculatedDifficulty : 1
    const randomProbability = Math.random() * 10

    // Пытаемся найти совпадающие пары
    for (let i = 0; i < weightedCards.length; i++) {
      for (let j = i + 1; j < weightedCards.length; j++) {
        if (
          weightedCards[i].getId() === weightedCards[j].getId() &&
          weightedCards[i] !== weightedCards[j] &&
          randomProbability < probability
        ) {
          this.liquidDifficulty++
          this.showCards(weightedCards[i], weightedCards[j])

          return
        }
      }
    }

    // Если совпадения не найдено, выбираем любые две случайные уникальные карты
    const uniqueCards = Array.from(
      new Set(weightedCards.map(card => card.getId()))
    )
      .map(id => weightedCards.find(card => card.getId() === id))
      .filter((card): card is Card => card !== undefined)
      .slice(0, 2)

    if (uniqueCards.length === 2) {
      this.liquidDifficulty = 0
      this.showCards(uniqueCards[0], uniqueCards[1])
      return
    }
  }
}
