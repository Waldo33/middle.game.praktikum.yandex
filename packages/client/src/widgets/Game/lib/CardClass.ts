import { colors } from '../constants/colors'
import { drawRoundRect } from './helpers/drawRoundRect'

export class Card {
  private id: number
  private image: HTMLImageElement
  private isRevealed = false
  private isMatched = false
  private isHovered = false

  constructor(id: number, image: HTMLImageElement) {
    this.id = id
    this.image = image
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
   * Метод для раскрытия карточки
   */
  public reveal() {
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
   * @see {@link https://stackoverflow.com/questions/28989493/html5-canvas-flip-card-animation пример реализации}
   */
  private animateFlip() {
    // TODO: Добавить анимированный переворот
    return true
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
    ctx.beginPath()
    drawRoundRect(ctx, x, y, width, height, 10)

    if (this.isRevealed) {
      ctx.fillStyle = colors.orange
      ctx.strokeStyle = colors.orange
    }

    if (!this.isRevealed && this.isHovered) {
      ctx.fillStyle = colors.darkblue
      ctx.strokeStyle = colors.darkblue
    }

    if (!this.isRevealed && !this.isHovered) {
      ctx.fillStyle = colors.blue
      ctx.strokeStyle = colors.blue
    }

    ctx.stroke()
    ctx.fill()

    if (this.isRevealed) {
      ctx.drawImage(this.image, x, y, width, height)
    }
  }
}
