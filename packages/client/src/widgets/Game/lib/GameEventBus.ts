import { EventBus } from '@shared/lib/classes/EventBus'

export type GameEvents = 'end-game' | 'score-update' | 'timer-tick'
export type GameEventBusType = EventBus<GameEvents>

export class GameEventBus {
  private static instance: GameEventBusType

  public static getInstance<T extends GameEvents>(): GameEventBusType {
    if (!GameEventBus.instance) {
      GameEventBus.instance = new EventBus<T>()
    }
    return GameEventBus.instance as EventBus<T>
  }
}
