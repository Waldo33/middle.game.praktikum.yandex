import { EventBus } from '@shared/lib/classes/EventBus'

type ScoreEvents = 'score-update'
type TimerEvents = 'timer-tick' | 'timer-end' | 'timer-reset'
export type GameEvents = 'end-game' | ScoreEvents | TimerEvents

export type GameEventBusType = EventBus<GameEvents>

/**
 * Синглтон для получения единой шины событий в игре
 */
export class GameEventBus {
  private static instance: GameEventBusType

  public static getInstance<T extends GameEvents>(): GameEventBusType {
    if (!GameEventBus.instance) {
      GameEventBus.instance = new EventBus<T>()
    }
    return GameEventBus.instance as EventBus<T>
  }
}
