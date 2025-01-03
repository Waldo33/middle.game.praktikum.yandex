export const getTimePad = (timeInSec: number) =>
  new Date(timeInSec * 1000).toISOString().slice(14, 19)

export const compareScoreWithLocalStorage = (key: string, newScore: number) => {
  const prevScore = Number(localStorage.getItem(key) || 0)
  if (prevScore < newScore) {
    localStorage.setItem(key, newScore.toString())
  }
}
