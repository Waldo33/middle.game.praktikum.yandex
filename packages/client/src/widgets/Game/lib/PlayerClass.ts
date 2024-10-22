import { GameEventBus, GameEventBusType } from './GameEventBus'

export class Player {
  private score = 0
  private id: number
  private bus: GameEventBusType

  constructor(id: number) {
    this.id = id
    this.bus = GameEventBus.getInstance()
  }

  public addPoint(): void {
    this.score += 1
    this.bus.emit('score-update', this.score)
  }

  public getScore(): number {
    return this.score
  }
}
