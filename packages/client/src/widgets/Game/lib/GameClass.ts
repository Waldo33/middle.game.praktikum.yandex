import { GameBoard } from './GameBoardClass'
import { Round } from './RoundClass'
import { GameEventBus, GameEventBusType } from './GameEventBus'
import { GameModes, Difficulty } from '@pages/GamePage/ui/GamePage'

/**
 * @todo
 * Из-за того что изначально игра писалась без наличия раундов, существует небольшой техдолг.
 * В идеале класс Game должен работать только с Player и Round, а Round в свою очередь с Timer и GameBoard.
 * На текущий момент класс игры инжектит в себя все существующие классы.
 * Работу с пользовательским вводом можно вынести в отдельный Controls класс, что сократит количество кода в Game.
 */
export class Game {
  private canvas: HTMLCanvasElement
  private gameBoard: GameBoard
  private currentRound: Round
  private bus: GameEventBusType

  constructor(
    canvas: HTMLCanvasElement,
    mode: GameModes,
    difficulty: Difficulty = 1
  ) {
    this.canvas = canvas

    this.gameBoard = new GameBoard(this.canvas, {
      rows: 5,
      columns: 8,
      padding: 7,
    })

    this.bus = GameEventBus.getInstance()

    this.currentRound = new Round(this.gameBoard, difficulty, mode)
  }

  private addEventListeners() {
    this.canvas.addEventListener(
      'click',
      this.currentRound.handleInput.bind(this)
    )
    this.canvas.addEventListener(
      'touchstart',
      this.currentRound.handleInput.bind(this)
    )
    this.canvas.addEventListener(
      'mousemove',
      this.currentRound.handleHover.bind(this)
    )
  }

  private removeEventListeners() {
    this.canvas.removeEventListener(
      'click',
      this.currentRound.handleInput.bind(this)
    )
    this.canvas.removeEventListener(
      'touchstart',
      this.currentRound.handleInput.bind(this)
    )
    this.canvas.removeEventListener(
      'mousemove',
      this.currentRound.handleHover.bind(this)
    )
  }

  public start() {
    this.bus.on('timer-end', this.end.bind(this))
    this.bus.on('end-game', () => {
      this.currentRound.reset()
      this.removeEventListeners()
    })

    this.addEventListeners()
    this.currentRound.start()
  }

  private end() {
    this.bus.emit('end-game')
  }
}
