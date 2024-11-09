import { Card } from '../lib/CardClass'

describe('Card', () => {
  let card: Card
  let otherCard: Card
  let imageMock: HTMLImageElement

  beforeEach(() => {
    imageMock = new Image()
    card = new Card(1, imageMock)
    otherCard = new Card(1, imageMock)
  })

  it('инициализируется в закрытом и неподсвеченном состоянии', () => {
    expect(card.checkRevealed()).toBe(false)
    expect(card.checkMatched()).toBe(false)
    expect((card as any).isHovered).toBe(false)
  })

  it('раскрывает карту и сбрасывает подсветку', () => {
    card.highlight()
    card.reveal()

    expect(card.checkRevealed()).toBe(true)
    expect((card as any).isHovered).toBe(false)
  })

  it('скрывает карту, если она не совпадает', () => {
    card.reveal()
    card.hide()

    expect(card.checkRevealed()).toBe(false)
  })

  it('устанавливает карту как совпадающую, если ID совпадают', () => {
    const isMatch = card.checkMatch(otherCard)

    expect(isMatch).toBe(true)
    expect(card.checkMatched()).toBe(true)
  })

  it('не устанавливает карту как совпадающую, если ID не совпадают', () => {
    const unmatchedCard = new Card(2, imageMock)
    const isMatch = card.checkMatch(unmatchedCard)

    expect(isMatch).toBe(false)
    expect(card.checkMatched()).toBe(false)
  })

  it('подсвечивает карту при наведении, если она закрыта', () => {
    card.highlight()

    expect((card as any).isHovered).toBe(true)
  })
})
