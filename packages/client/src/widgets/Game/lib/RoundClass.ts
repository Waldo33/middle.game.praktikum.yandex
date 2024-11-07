import { GameBoard } from './GameBoardClass'

export class Round {
  private gameBoard: GameBoard
  private currentRound: number

  constructor(gameBoard: GameBoard) {
    this.gameBoard = gameBoard
    this.currentRound = 1
  }

  public start() {
    this.gameBoard.setupBoard()
  }

  public reset() {
    this.currentRound = 1
  }

  public nextRound() {
    this.currentRound = this.currentRound + 1
    this.start()
  }
}
