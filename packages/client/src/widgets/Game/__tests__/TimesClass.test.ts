import { Timer } from '../lib/TimerClass'

const emitMock = jest.fn()

jest.mock('../lib/GameEventBus', () => ({
  GameEventBus: {
    getInstance: () => ({
      emit: emitMock,
    }),
  },
}))

describe('Timer', () => {
  let timer: Timer

  beforeEach(() => {
    jest.clearAllMocks()
    timer = new Timer(10)
  })

  it('инициализируется с заданным временем раунда', () => {
    expect(timer.getTimeLeft()).toBe(10)
  })

  it('сбрасывает время раунда', () => {
    timer.start()
    timer.resetRoundTimer()
    expect(timer.getTimeLeft()).toBe(10)
  })

  it('останавливает таймер и вызывает timer-reset', () => {
    jest.useFakeTimers()
    timer.start()
    timer.stopTimer()

    expect(emitMock).toHaveBeenCalledWith('timer-reset')
    jest.useRealTimers()
  })
})
