// GameClass.test.ts
import { Game } from '../lib/GameClass'
import { GameBoard } from '../lib/GameBoardClass'

import { Round } from '../lib/RoundClass'
import { GameEventBus } from '../lib/GameEventBus'
import { GameModes } from '@pages/GamePage/ui/GamePage'

jest.mock('../lib/GameBoardClass')
jest.mock('../lib/PlayerClass')
jest.mock('../lib/TimerClass')
jest.mock('../lib/GameEventBus')

describe('Game Class', () => {
  let canvas: HTMLCanvasElement
  let game: Game
  let gameBoard: GameBoard
  let round: Round
  let mockBus: { on: jest.Mock; emit: jest.Mock }

  beforeEach(() => {
    mockBus = {
      on: jest.fn(),
      emit: jest.fn(),
    }
    ;(GameEventBus.getInstance as jest.Mock).mockReturnValue(mockBus)
    canvas = document.createElement('canvas')
    gameBoard = new GameBoard(canvas, {
      rows: 5,
      columns: 8,
      padding: 7,
    })

    round = new Round(gameBoard, 5, GameModes.ROUND)
    game = new Game(canvas, GameModes.ROUND, 3)
  })

  it('инициализирует игру с заданными свойствами', () => {
    expect(game).toBeInstanceOf(Game)
    expect(GameBoard).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Object)
    )
  })

  it('начинает игру и подключает слушателей событий через addEventListeners', () => {
    const addEventListenersSpy = jest.spyOn<any, any>(game, 'addEventListeners')
    const roundStartSpy = jest.spyOn(game['currentRound'], 'start')

    game.start()

    expect(addEventListenersSpy).toHaveBeenCalled()
    expect(roundStartSpy).toHaveBeenCalled()
  })

  it('завершает игру при истечении таймера', () => {
    const endGameSpy = jest.spyOn<any, any>(game, 'end')
    let timerEndCallback: () => void

    mockBus.on.mockImplementation((event, callback) => {
      if (event === 'timer-end') {
        timerEndCallback = callback
      }
    })

    game.start()
    timerEndCallback!() // ts non-null

    expect(endGameSpy).toHaveBeenCalled()
  })
})
