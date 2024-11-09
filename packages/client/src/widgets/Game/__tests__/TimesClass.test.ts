import { GameModes } from '@pages/GamePage/ui/GamePage'
import { GameBoard } from '../lib/GameBoardClass'
import { Round } from '../lib/RoundClass'
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
  let round: Round
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    jest.clearAllMocks()
    canvas = document.createElement('canvas')

    gameBoard = new GameBoard(canvas, {
      rows: 5,
      columns: 8,
      padding: 7,
    }) // Передаем контекст в GameBoard

    round = new Round(gameBoard, 5, GameModes.ROUND)
    timer = new Timer(10, GameModes.ROUND, round)
  })

  it('инициализируется с заданным временем раунда', () => {
    expect(timer.getTimeLeft()).toBe(10)
  })

  it('сбрасывает время раунда', () => {
    timer.start()
    timer.reset()
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
