import { Game, GameEventBus } from '@widgets/Game'
import { useEffect, useRef, useState } from 'react'
import { compareScoreWithLocalStorage, getTimePad } from '../helpers'

export const useGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showGame, setShowGame] = useState(false)
  const [score, setScore] = useState(0)
  const [timePad, setTimePad] = useState('00:00')
  const bus = GameEventBus.getInstance()

  const onStartHandler = () => {
    setShowGame(true)
  }

  const setEndGame = () => {
    bus.emit('end-game')
  }

  const onEndGame = () => {
    setShowGame(false)
  }

  const onUpdateScore = (score: number) => {
    setScore(score)
    compareScoreWithLocalStorage(score)
  }

  const onTimeUpdate = (seconds: number) => {
    setTimePad(getTimePad(seconds))
  }

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current)

      bus.on('end-game', onEndGame)
      bus.on('score-update', onUpdateScore)
      bus.on('timer-tick', onTimeUpdate)
      bus.on('timer-reset', () => onTimeUpdate(0))

      game.start()

      return () => {
        bus.off('end-game', onEndGame)
        bus.off('score-update', onUpdateScore)
        bus.off('timer-tick', onTimeUpdate)
      }
    }
  }, [showGame])

  return {
    showGame,
    score,
    timePad,
    onStartHandler,
    onEndHandler: setEndGame,
    canvasRef,
  }
}
