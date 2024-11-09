import { GameBoard } from '../lib/GameBoardClass'
import { Card } from '../lib/CardClass'
import { Player } from '../lib/PlayerClass'

jest.mock('../lib/CardClass')
jest.mock('../lib/helpers/loadImage')
jest.mock('../lib/helpers/shuffleArrayItems')
jest.mock('../lib/PlayerClass')

describe('GameBoard Class', () => {
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D
  let gameBoard: GameBoard
  let player: Player

  beforeEach(() => {
    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    player = new Player(1)

    jest
      .spyOn(GameBoard.prototype, 'setupBoard')
      .mockImplementation(async function (this: GameBoard) {
        this['cards'] = Array(16).fill(new Card(0, new Image()))
        this['grid'] = this['createGrid'](this['cards'])
      })

    gameBoard = new GameBoard(ctx, {
      rows: 4,
      columns: 4,
      cardWidth: 100,
      cardHeight: 100,
      padding: 10,
    })
  })

  it('инициализируется с заданными параметрами', async () => {
    await gameBoard.setupBoard()

    expect(gameBoard).toBeInstanceOf(GameBoard)
    expect((gameBoard as any).rows).toBe(4)
    expect((gameBoard as any).columns).toBe(4)
    expect((gameBoard as any).cardWidth).toBe(100)
    expect((gameBoard as any).cardHeight).toBe(100)
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
    gameBoard.handleCardClick(position, player)

    expect(cardMock.reveal).toHaveBeenCalled()
    expect((gameBoard as any).selectedCards.length).toBe(1)
  })
})
