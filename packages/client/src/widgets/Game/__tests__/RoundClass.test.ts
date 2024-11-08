import { Round } from '../lib/RoundClass'
import { GameBoard } from '../lib/GameBoardClass'

jest.mock('../lib/GameBoardClass')

describe('Round', () => {
  let gameBoard: GameBoard
  let round: Round
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Не удалось получить контекст 2D')
    }
    gameBoard = new GameBoard(ctx, {
      cardWidth: 100,
      cardHeight: 100,
      padding: 10,
    }) // Передаем контекст в GameBoard
    round = new Round(gameBoard)
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

    round.nextRound()

    expect((round as any).currentRound).toBe(2)
    expect(startSpy).toHaveBeenCalled()
  })
})
