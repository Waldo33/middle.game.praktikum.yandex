import { GameModes, NumberFromOneToFive } from '@pages/GamePage/ui/GamePage'
import { Bot } from './BotClass'
import { GameBoard } from './GameBoardClass'
import { GameEventBus, GameEventBusType } from './GameEventBus'
import { Player } from './PlayerClass'
import { Timer } from './TimerClass'

export class Round {
  private gameBoard: GameBoard
  private currentRound: number
  private timer: Timer
  private bus: GameEventBusType
  private currentPlayer: Player | Bot
  private players: (Player | Bot)[]

  constructor(
    gameBoard: GameBoard,
    difficalty: NumberFromOneToFive,
    mode: GameModes
  ) {
    this.bus = GameEventBus.getInstance()
    this.gameBoard = gameBoard
    this.currentRound = 1

    const player = new Player(1, this.gameBoard, this)

    if (mode === GameModes.BOT) {
      this.players = [player, new Bot(2, difficalty, this.gameBoard, this)]
      this.timer = new Timer(15, mode, this)
    } else {
      this.players = [player]
      this.timer = new Timer(150, mode, this)
    }

    if (this.players.length > 1) {
      this.currentPlayer = this.players[0]
    } else {
      this.currentPlayer = this.players[0]
    }

    this.bus.emit('current-player-name', this.currentPlayer.getName())
  }

  public start() {
    this.timer.start()
    this.gameBoard.setupBoard()
    this.gameBoard.render()

    if (this.currentPlayer instanceof Bot) {
      this.currentPlayer.chooseCards()
    }
  }

  public reset() {
    this.timer.stopTimer()
    this.currentRound = 1
  }

  public next() {
    this.currentRound = this.currentRound + 1
    this.start()
  }

  public switchTurn() {
    this.gameBoard.clean()
    this.timer.reset()

    if (this.currentPlayer.getId() === this.players.length) {
      this.currentPlayer = this.players[0]
    } else {
      this.currentPlayer = this.players[this.currentPlayer.getId()]
    }

    this.bus.emit('current-player-name', this.currentPlayer.getName())

    if (this.currentPlayer instanceof Bot) {
      this.currentPlayer.chooseCards()
    }
  }

  public resetTime() {
    this.timer.reset()
  }

  private complete() {
    this.next()
    this.resetTime()
  }

  public handleInput = (event: MouseEvent | TouchEvent) => {
    if (this.currentPlayer instanceof Bot) {
      return
    }

    const position = this.gameBoard.getEventPosition(event)
    const areAllCardsMatched = this.gameBoard.checkAllCardsMatched()

    this.currentPlayer.chooseCards(position)

    if (areAllCardsMatched) {
      this.complete()
    }
  }

  public handleHover = (event: MouseEvent) => {
    if (this.currentPlayer instanceof Bot) {
      return
    }

    const position = this.gameBoard.getEventPosition(event)

    this.gameBoard.clearHighlight()
    const card = this.gameBoard.getCardAtPosition(position)

    if (card) {
      this.gameBoard.highlightCard(card)
    }

    this.gameBoard.render()
  }
}
