import { GameModes } from '@pages/GamePage/ui/GamePage'
import { GameBoard } from '../lib/GameBoardClass'
import { Timer } from '../lib/TimerClass'

const emitMock = jest.fn()

jest.mock('../lib/GameEventBus', () => ({
  GameEventBus: {
    getInstance: () => ({
      on: jest.fn(),
      emit: emitMock,
    }),
  },
}))

describe('Timer', () => {
  let timer: Timer
  let gameBoard: GameBoard
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    jest.clearAllMocks()
    canvas = document.createElement('canvas')

    gameBoard = new GameBoard(canvas, {
      rows: 5,
      columns: 8,
      padding: 7,
    }) // Передаем контекст в GameBoard

    timer = new Timer(10, GameModes.ROUND)
  })

  it('инициализируется с заданным временем раунда', () => {
    expect(timer.getCurrentTime()).toBe(10)
  })

  it('сбрасывает время раунда', () => {
    timer.start()
    timer.reset()
    expect(timer.getCurrentTime()).toBe(10)
  })

  it('останавливает таймер и вызывает timer-reset', () => {
    jest.useFakeTimers()
    timer.start()
    timer.stop()

    expect(emitMock).toHaveBeenCalledWith('timer-reset')
    jest.useRealTimers()
  })
})
