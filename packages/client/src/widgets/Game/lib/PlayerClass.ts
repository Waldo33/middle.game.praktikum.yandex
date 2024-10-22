export class Player {
  private score = 0
  private id: number

  constructor(id: number) {
    this.id = id
  }

  public addPoint(): void {
    this.score += 1
  }

  public getScore(): number {
    return this.score
  }
}
