import { Round } from '../lib/RoundClass'
import { GameBoard } from '../lib/GameBoardClass'
import { GameModes } from '@pages/GamePage/ui/GamePage'

jest.mock('../lib/GameBoardClass')

jest.mock('../lib/GameEventBus', () => {
  return {
    GameEventBus: {
      getInstance: jest.fn(() => ({
        emit: jest.fn(), // создаем мок для метода emit
        on: jest.fn(), // создаем мок для метода emit
      })),
    },
  }
})

describe('Round', () => {
  let gameBoard: GameBoard
  let round: Round
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    canvas = document.createElement('canvas')

    gameBoard = new GameBoard(canvas, {
      rows: 5,
      columns: 8,
      padding: 7,
    }) // Передаем контекст в GameBoard

    round = new Round(gameBoard, 5, GameModes.ROUND)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('инициализируется с текущим раундом 1', () => {
    expect((round as any).currentRound).toBe(1)
  })

  it('сбрасывает текущий раунд', () => {
    ;(round as any).currentRound = 5
    round.reset()

    expect((round as any).currentRound).toBe(1)
  })

  it('увеличивает текущий раунд и вызывает start', () => {
    const startSpy = jest.spyOn(round, 'start')

    round.next()

    expect((round as any).currentRound).toBe(2)
    expect(startSpy).toHaveBeenCalled()
  })
})
