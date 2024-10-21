export class Player {
  private score = 0

  public addPoint(): void {
    this.score += 1
  }

  public getScore(): number {
    return this.score
  }
}
