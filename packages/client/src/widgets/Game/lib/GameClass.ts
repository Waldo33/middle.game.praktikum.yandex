import { EventBus } from '@shared/lib/classes/EventBus'
import { GameBoard } from './GameBoardClass'
import { Player } from './PlayerClass'
import { Round } from './RoundClass'
import { Timer } from './TimerClass'
import { GameEventBus, GameEventBusType } from './GameEventBus'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private gameBoard: GameBoard
  private currentPlayer: Player
  private timer: Timer
  private currentRound: Round
  private bus: GameEventBusType

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // TODO: Необходимо вынести логику рассчета размеров
    const rows = 5
    const columns = 8
    const padding = 7
    const cardSize = 95
    this.canvas.width = columns * (cardSize + padding)
    this.canvas.height = rows * (cardSize + padding)

    const ctx = this.canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Error creating 2D context.')
    }

    this.ctx = ctx

    this.gameBoard = new GameBoard(this.ctx, {
      rows,
      columns,
      cardWidth: cardSize,
      cardHeight: cardSize,
      padding,
    })
    this.currentPlayer = new Player(1)

    this.timer = new Timer(150)
    this.bus = GameEventBus.getInstance()

    this.currentRound = new Round(this.gameBoard)
  }

  private addEventListeners() {
    this.canvas.addEventListener('click', this.handleInput.bind(this))
    this.canvas.addEventListener('touchstart', this.handleInput.bind(this))
    this.canvas.addEventListener('mousemove', this.handleHover.bind(this))
  }

  private removeEventListeners() {
    this.canvas.removeEventListener('click', this.handleInput.bind(this))
    this.canvas.removeEventListener('touchstart', this.handleInput.bind(this))
    this.canvas.removeEventListener('mousemove', this.handleHover.bind(this))
  }

  public start() {
    this.bus.on('timer-end', this.endGame.bind(this))
    this.bus.on('end-game', () => {
      this.timer.stopTimer()
      this.currentRound.reset()
      this.removeEventListeners()
    })

    this.addEventListeners()
    this.timer.start()
    this.currentRound.start()
    this.gameBoard.render()
  }

  private endGame() {
    this.bus.emit('end-game')
  }

  private onRoundComplete() {
    console.log('Round has ended, starting new round...')
    this.currentRound.nextRound()
    this.timer.resetRoundTimer()
  }

  private handleInput(event: MouseEvent | TouchEvent) {
    const position = this.getEventPosition(event)
    this.gameBoard.handleCardClick(position, this.currentPlayer)

    if (this.gameBoard.checkAllCardsMatched()) {
      this.onRoundComplete()
      return
    }
  }

  private handleHover(event: MouseEvent) {
    const position = this.getEventPosition(event)
    this.gameBoard.handleHover(position)
  }

  private getEventPosition(event: MouseEvent | TouchEvent): {
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
}
