export const getTimePad = (timeInSec: number) =>
  new Date(timeInSec * 1000).toISOString().slice(14, 19)

export const compareScoreWithLocalStorage = (newScore: number) => {
  const prevScore = Number(localStorage.getItem('score') || 0)
  if (prevScore < newScore) {
    localStorage.setItem('score', newScore.toString())
  }
}
