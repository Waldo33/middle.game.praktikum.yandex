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
  private mode: GameModes

  constructor(
    gameBoard: GameBoard,
    difficalty: NumberFromOneToFive,
    mode: GameModes
  ) {
    this.bus = GameEventBus.getInstance()
    this.gameBoard = gameBoard
    this.currentRound = 1
    this.mode = mode
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
    if (this.gameBoard.checkAllCardsMatched()) {
      this.complete()
      this.bus.emit('timer-end')
    }

    this.gameBoard.clean()

    if (this.mode === GameModes.BOT) {
      this.resetTime()
    }

    if (this.currentPlayer.getId() === this.players.length) {
      this.currentPlayer = this.players[0]
    } else {
      this.currentPlayer = this.players[this.currentPlayer.getId()]
    }

    this.bus.emit('current-player-name', this.currentPlayer.getName())

    if (this.currentPlayer instanceof Bot) {
      this.currentPlayer.chooseCards()
    }

    if (this.gameBoard.checkAllCardsMatched()) {
      this.stopRound()
    }
  }

  private stopRound() {
    this.complete()
    this.bus.emit('timer-end')
    this.timer.stopTimer()
  }

  public resetTime() {
    this.timer.reset()
  }

  /**
   * Метод для проверки совпадения среди 2 выбранных карточек
   */
  public checkForMatch() {
    if (this.gameBoard.checkSelectedCardsMatched()) {
      this.currentPlayer.addPoint()
      this.gameBoard.deleteSelectedCards()

      if (this.mode === GameModes.BOT) {
        this.resetTime()
      }

      if (this.currentPlayer instanceof Bot) {
        this.currentPlayer.chooseCards()
      }
    } else {
      setTimeout(() => {
        this.switchTurn()
      }, 2000)
    }
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

    this.currentPlayer.chooseCards(position)

    if (this.gameBoard.checkAllCardsMatched()) {
      this.stopRound()
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
