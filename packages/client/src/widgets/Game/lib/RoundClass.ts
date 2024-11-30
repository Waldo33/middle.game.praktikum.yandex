import { GameModes, Difficulty } from '@pages/GamePage/ui/GamePage'
import { Bot } from './BotClass'
import { GameBoard } from './GameBoardClass'
import { GameEventBus, GameEventBusType } from './GameEventBus'
import { Player } from './PlayerClass'
import { Timer } from './TimerClass'

export class Round {
  private currentRound: number
  private timer: Timer
  private bus: GameEventBusType
  private currentPlayer: Player | Bot
  private players: (Player | Bot)[]

  constructor(
    readonly gameBoard: GameBoard,
    difficulty: Difficulty,
    readonly mode: GameModes
  ) {
    this.bus = GameEventBus.getInstance()
    this.currentRound = 1

    const player = new Player(1, this.gameBoard, this)

    if (mode === GameModes.BOT) {
      this.players = [player, new Bot(2, difficulty, this.gameBoard, this)]
      this.timer = new Timer(15, mode)
    } else {
      this.players = [player]
      this.timer = new Timer(180, mode)
    }

    this.currentPlayer = this.players[0]

    this.bus.emit('current-player-name', this.currentPlayer.getName())
    this.bus.on('switch-turn', this.switchTurn)
  }

  public start() {
    this.timer.start()
    this.gameBoard.setupBoard()
    this.gameBoard.render()
  }

  public reset() {
    this.timer.stop()
    this.currentRound = 1
  }

  public next() {
    this.currentRound = this.currentRound + 1
    this.start()
  }

  public switchTurn() {
    if (this.gameBoard.checkAllCardsMatched()) {
      this.complete()
    }

    this.gameBoard.clean()

    if (this.mode === GameModes.BOT) {
      this.timer.reset()
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
      this.stop()
    }
  }

  private stop() {
    this.complete()
    this.timer.stop()
  }

  /**
   * Метод для проверки совпадения среди 2 выбранных карточек
   */
  public checkForMatch() {
    if (this.gameBoard.checkSelectedCardsMatched()) {
      this.currentPlayer.addPoint()
      this.gameBoard.deleteSelectedCards()

      if (this.mode === GameModes.BOT) {
        this.timer.reset()
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
    if (this.mode === GameModes.BOT) {
      this.bus.emit('timer-end')
    }
    this.next()
    this.timer.reset()
  }

  public handleInput = (event: MouseEvent | TouchEvent) => {
    if (this.currentPlayer instanceof Bot) {
      return
    }

    const position = this.gameBoard.getEventPosition(event)

    this.currentPlayer.chooseCards(position)

    if (this.gameBoard.checkAllCardsMatched()) {
      this.stop()
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
