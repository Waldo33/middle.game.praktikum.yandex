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

  /**
   * Метод нахождения пары на основе вероятности
   */
  private findMatchingPair(
    cards: Card[],
    probability: number
  ): [Card, Card] | null {
    const randomProbability = Math.random() * 10

    for (let i = 0; i < cards.length; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (
          cards[i].getId() === cards[j].getId() &&
          cards[i] !== cards[j] &&
          randomProbability < probability
        ) {
          return [cards[i], cards[j]]
        }
      }
    }
    return null
  }

  /**
   * Метод рассчета вероятности на основе закрытых карт
   */
  private increaseDifficultyByUnmatchedCards(
    unmatchedCardsCount: number,
    calculatedDifficulty: number
  ): number {
    if (unmatchedCardsCount === 2) {
      return 10
    }

    const totalCardsCount = this.gameBoard.getCards().length
    const isLessThanOneThirdUnmatched =
      totalCardsCount / 3 > unmatchedCardsCount
    const isLessThanHalfUnmatched = totalCardsCount / 2 > unmatchedCardsCount

    if (isLessThanOneThirdUnmatched && this.liquidDifficulty < 6) {
      calculatedDifficulty += 3
    } else if (
      isLessThanHalfUnmatched &&
      !isLessThanOneThirdUnmatched &&
      this.liquidDifficulty < 7
    ) {
      calculatedDifficulty += 2
    }

    return calculatedDifficulty
  }

  /**
   * Метод рассчета вероятности
   */
  private calculateProbability() {
    const unmatchedCards: Card[] = this.gameBoard
      .getCards()
      .filter(card => !card.checkMatched())
    let calculatedDifficulty = this.difficulty - this.liquidDifficulty

    calculatedDifficulty = this.increaseDifficultyByUnmatchedCards(
      unmatchedCards.length,
      calculatedDifficulty
    )

    const weightedCards = unmatchedCards
      .flatMap((card: Card) => (card.checkTouched() ? [card, card] : [card]))
      .sort(() => Math.random() - 0.5)

    return {
      cards: weightedCards,
      probability: calculatedDifficulty >= 1 ? calculatedDifficulty : 1,
    }
  }

  /**
   * Метод выбора двух рандомных несовпадающих карт
   */
  private chooseRandomUniqueCards(cards: Card[]): [Card, Card] | null {
    const uniqueCards = Array.from(new Set(cards.map(card => card.getId())))
      .map(id => cards.find(card => card.getId() === id))
      .filter((card): card is Card => card !== undefined)
      .slice(0, 2)

    return uniqueCards.length === 2 ? [uniqueCards[0], uniqueCards[1]] : null
  }

  /**
   * Метод выбора карт
   */
  public chooseCards() {
    const { cards, probability } = this.calculateProbability()
    const matchingPair = this.findMatchingPair(cards, probability)

    if (matchingPair) {
      this.liquidDifficulty++
      this.showCards(matchingPair[0], matchingPair[1])
      return
    }

    const randomPair = this.chooseRandomUniqueCards(cards)
    if (randomPair) {
      this.liquidDifficulty = 0
      this.showCards(randomPair[0], randomPair[1])
    }
  }
}
