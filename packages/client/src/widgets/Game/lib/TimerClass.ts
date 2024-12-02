import { GameModes } from '@pages/GamePage/ui/GamePage'
import { GameEventBus, GameEventBusType } from './GameEventBus'

export class Timer {
  private currentTime: number
  private intervalId: ReturnType<typeof setInterval> | null = null
  private bus: GameEventBusType

  constructor(readonly defaultTime: number, readonly mode: GameModes) {
    this.currentTime = defaultTime
    this.bus = GameEventBus.getInstance()
  }

  public start() {
    this.reset()
    this.intervalId = setInterval(() => {
      this.currentTime--
      this.bus.emit('timer-tick', this.getCurrentTime())
      if (this.currentTime <= 0) {
        if (this.mode === GameModes.BOT) {
          this.bus.emit('switch-turn')
        } else {
          this.stop()
          this.bus.emit('timer-end')
        }
      }
    }, 1000)
  }

  public reset() {
    this.currentTime = this.defaultTime
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.bus.emit('timer-reset')
    }
  }

  public getCurrentTime() {
    return this.currentTime
  }
}
