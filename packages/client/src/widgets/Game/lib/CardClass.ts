import { colors } from '../constants/colors'
import { GameBoard } from './GameBoardClass'
import { drawRoundRect } from './helpers/drawRoundRect'

export class Card {
  private id: number
  private image: HTMLImageElement
  private gameBoard: GameBoard
  private isRevealed = false
  private isMatched = false
  private isHovered = false
  private flipProgress = 0
  private isFlipping = false
  private isTouched = false

  constructor(id: number, image: HTMLImageElement, gameBoard: GameBoard) {
    this.id = id
    this.image = image
    this.gameBoard = gameBoard
  }

  /**
   * Метод показывающий раскрыта ли карточка
   */
  public checkRevealed() {
    return this.isRevealed
  }

  /**
   * Метод для проверки, есть ли у карточки уже пара
   */
  public checkMatched() {
    return this.isMatched
  }

  /**
   * Метод проверки, была ли открыта карта за раунд
   */
  public checkTouched() {
    return this.isTouched
  }

  /**
   * Метод для раскрытия карточки
   */
  public reveal() {
    this.isTouched = true

    if (!this.isMatched) {
      this.isHovered = false
      this.isRevealed = true
      this.animateFlip()
    }
  }

  /**
   * Метод для скрытия карточки
   */
  public hide() {
    if (!this.isMatched) {
      this.isRevealed = false
      this.animateFlip()
    }
  }

  /**
   * Метод для сравнения совпадения с другой открытой картой
   */
  public checkMatch(otherCard: Card): boolean {
    if (this.id === otherCard.id) {
      this.isMatched = true
      return true
    }
    return false
  }

  /**
   * Метод для сравнения совпадения с другой открытой картой
   */
  public getId(): number {
    return this.id
  }

  /**
   * Метод для анимации переворорта карточки
   */
  private animateFlip() {
    if (this.isFlipping) return

    this.isFlipping = true
    this.flipProgress = 0

    const flip = () => {
      this.flipProgress += 0.05

      if (this.flipProgress >= 0.5 && !this.isRevealed) {
        this.isRevealed = false
      }

      if (this.flipProgress < 1) {
        requestAnimationFrame(flip)
        this.gameBoard.render()
      } else {
        this.gameBoard.render()
        this.flipProgress = 0
        this.isFlipping = false
      }
    }

    requestAnimationFrame(flip)
  }

  /**
   * Метод для подсветки карточки при наведении
   */
  public highlight() {
    if (!this.isRevealed) {
      this.isHovered = true
    }
  }

  /**
   * Метод для очистки подсветки карточки
   */
  public clearHighlight() {
    if (!this.isRevealed) {
      this.isHovered = false
    }
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    ctx.save()
    ctx.translate(x + width / 2, y + height / 2)

    const scale =
      this.flipProgress < 0.5
        ? 1 - this.flipProgress * 2
        : (this.flipProgress - 0.5) * 2
    ctx.scale(scale, 1)

    drawRoundRect(ctx, -width / 2, -height / 2, width, height, 10)

    if (this.isRevealed) {
      ctx.fillStyle = colors.orange
      ctx.strokeStyle = colors.orange
    } else {
      ctx.fillStyle = this.isHovered ? colors.darkblue : colors.blue
      ctx.strokeStyle = this.isHovered ? colors.darkblue : colors.blue
    }

    ctx.stroke()
    ctx.fill()

    if (this.isRevealed) {
      ctx.drawImage(this.image, -width / 2, -height / 2, width, height)
    }

    ctx.restore()
  }
}
