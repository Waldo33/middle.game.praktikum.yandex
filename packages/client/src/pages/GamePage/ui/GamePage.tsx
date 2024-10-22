import { cn } from '@shared/lib/utils'
import s from './GamePage.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Game, GameEventBus } from '@widgets/Game'
import { compareScoreWithLocalStorage, getTimePad } from '../lib/helpers'
import { ResetButton } from './ResetButton'

export enum GamePageSteps {
  START = 'start',
  GAME = 'game',
  END = 'end',
}

export const GamePage: FC = () => {
  const bestScore = Number(localStorage.getItem('score') || 0)
  const eventBus = GameEventBus.getInstance()

  const [step, setStep] = useState(GamePageSteps.START)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onStart = () => {
    setStep(GamePageSteps.GAME)
  }

  const onUpdateScore = (score: number) => {
    setScore(score)
    compareScoreWithLocalStorage(score)
  }

  const onTimeUpdate = (seconds: number) => {
    setTime(seconds)
  }

  const onEndGame = () => {
    setStep(GamePageSteps.END)
    setScore(0)
  }

  const setEndGame = () => {
    eventBus.emit('end-game')
  }

  useEffect(() => {
    if (canvasRef.current && step === GamePageSteps.GAME) {
      const game = new Game(canvasRef.current)

      eventBus.on('end-game', onEndGame)
      eventBus.on('score-update', onUpdateScore)
      eventBus.on('timer-tick', onTimeUpdate)
      eventBus.on('timer-reset', () => onTimeUpdate(0))

      game.start()

      return () => {
        eventBus.off('end-game', onEndGame)
        eventBus.off('score-update', onUpdateScore)
        eventBus.off('timer-tick', onTimeUpdate)
      }
    }
  }, [step])

  if (step === GamePageSteps.START) {
    return (
      <div className={cn('index-wrapper')}>
        <div className={cn(s.buttonContainer)}>
          <Button className={s.startButton} onClick={onStart}>
            Начать игру
          </Button>
        </div>
      </div>
    )
  }

  if (step === GamePageSteps.END) {
    return (
      <div className={cn('index-wrapper')}>
        <div className={cn(s.buttonContainer)}>
          <Button className={s.startButton} onClick={onStart}>
            Начать снова
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('index-wrapper')}>
      <div className={s.score}>
        <div className={s.currentScore}>
          <div className={cn(s['currentScore-number'], 'h1')}>{score}</div>
          <div className={cn(s['currentScore-text'], 'h6')}>счет</div>
        </div>
        {bestScore > 0 && (
          <div className={s.bestScore}>
            <div className={cn(s['bestScore-text'])}>
              лучший
              <br />
              счет
            </div>
            <div className={cn(s['bestScore-number'])}>{bestScore}</div>
          </div>
        )}
      </div>
      <div className={cn(s.container)}>
        <div className={s['top-panel']}>
          <div className={cn(s.timer, 'h2')}>{getTimePad(time)}</div>
          <ResetButton onClick={setEndGame} />
        </div>
        <canvas className={s.gameCanvas} ref={canvasRef} />
      </div>
    </div>
  )
}
