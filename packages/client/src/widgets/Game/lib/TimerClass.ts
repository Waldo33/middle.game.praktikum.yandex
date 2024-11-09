import { GameModes } from '@pages/GamePage/ui/GamePage'
import { GameEventBus, GameEventBusType } from './GameEventBus'
import { Round } from './RoundClass'

export class Timer {
  private defaultRoundTime: number
  private roundTime: number
  private intervalId: ReturnType<typeof setInterval> | null = null
  private bus: GameEventBusType
  private mode: GameModes
  private round: Round

  constructor(roundDuration: number, mode: GameModes, round: Round) {
    this.defaultRoundTime = roundDuration
    this.roundTime = roundDuration
    this.bus = GameEventBus.getInstance()
    this.mode = mode
    this.round = round
  }

  public start() {
    this.reset()
    this.intervalId = setInterval(() => {
      this.roundTime--
      this.bus.emit('timer-tick', this.getTimeLeft())
      if (this.roundTime <= 0) {
        if (this.mode === GameModes.BOT) {
          this.round.switchTurn()
        } else {
          this.stopTimer()
          this.bus.emit('timer-end')
        }
      }
    }, 1000)
  }

  public reset() {
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
