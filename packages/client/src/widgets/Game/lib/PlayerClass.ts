import { Card } from './CardClass'
import { GameEventBus, GameEventBusType } from './GameEventBus'
import { GameBoard } from './GameBoardClass'
import { Round } from './RoundClass'

export class Player {
  private score = 0
  public id: number
  private bus: GameEventBusType
  private gameBoard: GameBoard
  private round: Round
  private name: string

  constructor(id: number, gameBoard: GameBoard, round: Round) {
    this.id = id
    this.bus = GameEventBus.getInstance()
    this.gameBoard = gameBoard
    this.round = round
    this.name = 'Игрок'
  }

  public getName(): string {
    return this.name
  }

  public getId(): number {
    return this.id
  }

  public addPoint(): void {
    this.score += 1
    this.bus.emit('score-update', this.score)
  }

  public getScore(): number {
    return this.score
  }

  /**
   * Метод выбора карт
   */
  public chooseCards(position: { x: number; y: number }) {
    if (this.gameBoard.isMaxCardsSelected()) {
      return null
    }

    const clickedCard: null | Card = this.gameBoard.getCardAtPosition(position)

    if (!clickedCard) {
      return null
    }

    const isRevealed = clickedCard.checkRevealed()

    if (!isRevealed) {
      clickedCard.reveal()
      this.gameBoard.addSelectedCard(clickedCard)
    }

    if (!isRevealed && this.gameBoard.isMaxCardsSelected()) {
      this.round.checkForMatch()
    }

    this.gameBoard.render()
  }
}
