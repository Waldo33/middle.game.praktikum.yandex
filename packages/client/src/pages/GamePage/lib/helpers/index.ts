export const getTimePad = (timeInSec: number) => {
  const minutes = Math.floor(timeInSec / 60)
  const seconds = timeInSec - minutes * 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`
}

export const compareScoreWithLocalStorage = (newScore: number) => {
  const prevScore = Number(localStorage.getItem('score') || 0)
  if (prevScore < newScore) {
    localStorage.setItem('score', newScore.toString())
  }
}
