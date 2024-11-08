import { GameBoard } from '../lib/GameBoardClass'
import { Card } from '../lib/CardClass'
import { Player } from '../lib/PlayerClass'
import { Round } from '../lib/RoundClass'
import { GameModes } from '@pages/GamePage/ui/GamePage'

jest.mock('../lib/CardClass')
jest.mock('../lib/helpers/loadImage')
jest.mock('../lib/helpers/shuffleArrayItems')

jest.mock('../lib/GameEventBus', () => {
  return {
    GameEventBus: {
      getInstance: jest.fn(() => ({
        emit: jest.fn(), // создаем мок для метода emit
      })),
    },
  }
})

describe('GameBoard Class', () => {
  let canvas: HTMLCanvasElement
  let gameBoard: GameBoard
  let player: Player
  let round: Round

  beforeEach(() => {
    canvas = document.createElement('canvas')

    jest
      .spyOn(GameBoard.prototype, 'setupBoard')
      .mockImplementation(async function (this: GameBoard) {
        this['cards'] = Array(16).fill(new Card(0, new Image()))
        this['grid'] = this['createGrid'](this['cards'])
      })

    gameBoard = new GameBoard(canvas, {
      rows: 4,
      columns: 4,
      padding: 10,
    })
    round = new Round(gameBoard, 5, GameModes.ROUND)
    player = new Player(1, gameBoard, round)
  })

  it('инициализируется с заданными параметрами', async () => {
    await gameBoard.setupBoard()

    expect(gameBoard).toBeInstanceOf(GameBoard)
    expect((gameBoard as any).rows).toBe(4)
    expect((gameBoard as any).columns).toBe(4)
    expect((gameBoard as any).cardWidth).toBe(95)
    expect((gameBoard as any).cardHeight).toBe(95)
  })

  it('возвращает true, если все карточки совпадают', () => {
    ;(gameBoard as any).cards = Array(16).fill({
      checkMatched: jest.fn(() => true),
    })

    expect(gameBoard.checkAllCardsMatched()).toBe(true)
  })

  it('обрабатывает клик по карточке', () => {
    const position = { x: 50, y: 50 }
    const cardMock = {
      checkRevealed: jest.fn(() => false),
      reveal: jest.fn(),
      checkMatch: jest.fn(() => true),
      hide: jest.fn(),
    }
    ;(gameBoard as any).getCardAtPosition = jest.fn(() => cardMock)

    const event = new MouseEvent('click')

    round.handleInput(event)

    expect((gameBoard as any).selectedCards.length).toBe(1)
  })
})
