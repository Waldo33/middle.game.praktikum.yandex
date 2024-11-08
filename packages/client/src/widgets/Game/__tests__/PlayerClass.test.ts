import { GameModes } from '@pages/GamePage/ui/GamePage'
import { GameBoard } from '../lib/GameBoardClass'
import { Player } from '../lib/PlayerClass'
import { Round } from '../lib/RoundClass'

jest.mock('../lib/GameEventBus', () => {
  return {
    GameEventBus: {
      getInstance: jest.fn(() => ({
        emit: jest.fn(), // создаем мок для метода emit
      })),
    },
  }
})

describe('Player', () => {
  let player: Player
  let canvas: HTMLCanvasElement
  let gameBoard: GameBoard

  let round: Round

  beforeEach(() => {
    canvas = document.createElement('canvas')

    gameBoard = new GameBoard(canvas, {
      rows: 4,
      columns: 4,
      padding: 10,
    })
    round = new Round(gameBoard, 5, GameModes.ROUND)
    player = new Player(1, gameBoard, round)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('инициализируется с начальным счетом 0', () => {
    expect(player.getScore()).toBe(0)
  })

  it('увеличивает счет при вызове addPoint', () => {
    player.addPoint()
    expect(player.getScore()).toBe(1)
  })
})
