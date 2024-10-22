import { GameBoard } from './GameBoardClass'
import { Player } from './PlayerClass'
import { Round } from './RoundClass'
import { Timer } from './TimerClass'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private gameBoard: GameBoard
  private players: Player[]
  private timer: Timer
  private currentRound: Round
  private onEndGameHandler: (result: number) => void = () => null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // TODO: Необходимо вынести логику рассчета размеров
    const gridSize = 6
    const padding = 10
    const cardSize = 100
    this.canvas.width = gridSize * (cardSize + padding)
    this.canvas.height = gridSize * (cardSize + padding)

    const ctx = this.canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Error creating 2D context.')
    }

    this.ctx = ctx

    this.gameBoard = new GameBoard(this.ctx, {
      rows: gridSize,
      columns: gridSize,
      cardWidth: cardSize,
      cardHeight: cardSize,
      padding,
    })
    this.players = this.initializePlayers()
    this.timer = new Timer(90, this.endGame.bind(this))
    this.currentRound = new Round(this.gameBoard)
  }

  private initializePlayers(): Player[] {
    // TODO: Изменить мок на реальные данные
    return [new Player(1)]
  }

  public addOnEndGameHandler(handler: (result: number) => void) {
    this.onEndGameHandler = handler
  }

  public getTimeLeft() {
    return this.timer.getTimeLeft()
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
    this.addEventListeners()
    this.timer.start()
    this.currentRound.start()
    this.gameBoard.render()
  }

  private endGame() {
    const score = this.players[0].getScore()
    console.log(`Game Over! Final score: ${score}`)
    this.timer.stopTimer()
    this.currentRound.reset()
    this.removeEventListeners()

    this.onEndGameHandler?.(score)
  }

  private onRoundComplete() {
    console.log('Round has ended, starting new round...')
    this.currentRound.nextRound()
    this.timer.resetRoundTimer()
  }

  private handleInput(event: MouseEvent | TouchEvent) {
    const position = this.getEventPosition(event)
    this.gameBoard.handleCardClick(position, this.players[0])

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
