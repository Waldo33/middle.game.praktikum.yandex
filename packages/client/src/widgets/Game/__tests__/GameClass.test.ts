// GameClass.test.ts
import { Game } from '../lib/GameClass'
import { GameBoard } from '../lib/GameBoardClass'
import { Player } from '../lib/PlayerClass'
import { Timer } from '../lib/TimerClass'
import { Round } from '../lib/RoundClass'
import { GameEventBus } from '../lib/GameEventBus'

jest.mock('../lib/GameBoardClass')
jest.mock('../lib/PlayerClass')
jest.mock('../lib/TimerClass')
jest.mock('../lib/RoundClass')
jest.mock('../lib/GameEventBus')

describe('Game Class', () => {
  let canvas: HTMLCanvasElement
  let game: Game
  let mockBus: { on: jest.Mock; emit: jest.Mock }

  beforeEach(() => {
    mockBus = {
      on: jest.fn(),
      emit: jest.fn(),
    }
    ;(GameEventBus.getInstance as jest.Mock).mockReturnValue(mockBus)
    canvas = document.createElement('canvas')
    game = new Game(canvas)
  })

  it('инициализирует игру с заданными свойствами', () => {
    expect(game).toBeInstanceOf(Game)
    expect(GameBoard).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Object)
    )
    expect(Player).toHaveBeenCalledWith(1)
    expect(Timer).toHaveBeenCalledWith(150)
    expect(Round).toHaveBeenCalledWith(expect.any(GameBoard))
  })

  it('начинает игру и подключает слушателей событий через addEventListeners', () => {
    const addEventListenersSpy = jest.spyOn<any, any>(game, 'addEventListeners')
    const timerStartSpy = jest.spyOn(game['timer'], 'start')
    const roundStartSpy = jest.spyOn(game['currentRound'], 'start')

    game.start()

    expect(addEventListenersSpy).toHaveBeenCalled()
    expect(timerStartSpy).toHaveBeenCalled()
    expect(roundStartSpy).toHaveBeenCalled()
  })

  it('завершает игру при истечении таймера', () => {
    const endGameSpy = jest.spyOn<any, any>(game, 'endGame')
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

  it('регистрирует клик', () => {
    const handleCardClickSpy = jest.spyOn(game['gameBoard'], 'handleCardClick')

    game.start()
    game['handleInput'](new MouseEvent('click'))

    expect(handleCardClickSpy).toHaveBeenCalled()
  })
})
