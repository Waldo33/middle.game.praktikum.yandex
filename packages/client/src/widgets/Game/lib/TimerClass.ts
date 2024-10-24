import { GameEventBus, GameEventBusType } from './GameEventBus'

export class Timer {
  private defaultRoundTime: number
  private roundTime: number
  private intervalId: ReturnType<typeof setInterval> | null = null
  private bus: GameEventBusType

  constructor(roundDuration: number) {
    this.defaultRoundTime = roundDuration
    this.roundTime = roundDuration
    this.bus = GameEventBus.getInstance()
  }
  public start() {
    this.resetRoundTimer()
    this.intervalId = setInterval(() => {
      this.roundTime--
      this.bus.emit('timer-tick', this.getTimeLeft())
      if (this.roundTime <= 0) {
        this.stopTimer()
        this.bus.emit('timer-end')
      }
    }, 1000)
  }

  public resetRoundTimer() {
    this.roundTime = this.defaultRoundTime
  }

  public stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.bus.emit('timer-reset')
    }
  }

  public getTimeLeft() {
    return this.roundTime
  }
}
