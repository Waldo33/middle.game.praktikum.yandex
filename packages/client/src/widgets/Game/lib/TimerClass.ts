export class Timer {
  private defaultRoundTime: number
  private roundTime: number
  private intervalId: ReturnType<typeof setInterval> | null = null
  private onEnd: () => void

  constructor(roundDuration: number, onEnd: () => void) {
    this.defaultRoundTime = roundDuration
    this.roundTime = roundDuration
    this.onEnd = onEnd
  }
  public start() {
    this.resetRoundTimer()
    this.intervalId = setInterval(() => {
      this.roundTime--
      if (this.roundTime <= 0) {
        this.stopTimer()
        this.onEnd()
      }
    }, 1000)
  }

  public resetRoundTimer() {
    this.roundTime = this.defaultRoundTime
  }

  public stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
    }
  }

  public getTimeLeft() {
    return this.roundTime
  }
}
