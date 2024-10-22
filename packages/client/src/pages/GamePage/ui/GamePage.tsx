import { cn } from '@shared/lib/utils'
import { Game } from '@widgets/Game'
import s from './GamePage.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/components/ui/button'

export const GamePage: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [showGame, setShowGame] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const onStartHandler = () => {
    setShowGame(true)
  }

  useEffect(() => {
    if (canvasRef.current) {
      const gameInstanse = new Game(canvasRef.current)

      gameInstanse.addOnEndGameHandler(result => {
        // TODO: Вывод итогового счета
        console.log(result)
        setShowGame(false)
      })

      gameInstanse.start()

      const intervalId = setInterval(() => {
        const timeLeft = gameInstanse.getTimeLeft()
        setSeconds(timeLeft)
      }, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [showGame])

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time - minutes * 60
    return [minutes, seconds]
  }

  return (
    <div ref={containerRef}>
      <h2 style={{ textAlign: 'center' }}>
        {getTime(seconds)
          .map(number => String(number).padStart(2, '0'))
          .join(':')}
      </h2>
      {!showGame && (
        <div className={cn(s.buttonContainer)}>
          <Button onClick={onStartHandler}>Начать игру</Button>
        </div>
      )}
      {showGame && <canvas className={s.gameCanvas} ref={canvasRef} />}
    </div>
  )
}
