import { Player } from '../lib/PlayerClass'

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

  beforeEach(() => {
    player = new Player(1)
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
