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

  public checkRevealed() {
    return this.isRevealed
  }

  public checkMatched() {
    return this.isMatched
  }

  public reveal() {
    if (!this.isMatched) {
      this.isHovered = false
      this.isRevealed = true
      this.animateFlip()
    }
  }

  public hide() {
    if (!this.isMatched) {
      this.isRevealed = false
      this.animateFlip()
    }
  }

  public checkMatch(otherCard: Card): boolean {
    if (this.id === otherCard.id) {
      this.isMatched = true
      return true
    }
    return false
  }

  private animateFlip() {
    // TODO: Добавить анимированный переворот
    return true
  }

  public highlight() {
    if (!this.isRevealed) {
      this.isHovered = true
    }
  }

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
