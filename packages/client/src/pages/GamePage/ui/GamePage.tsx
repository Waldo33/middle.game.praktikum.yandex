import { cn } from '@shared/lib/utils'
import s from './GamePage.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Game, GameEventBus } from '@widgets/Game'
import { compareScoreWithLocalStorage, getTimePad } from '../lib/helpers'
import { ResetButton } from './ResetButton'
import { GameStart } from '@pages/GamePage/ui/GameStart'
import { GameEnd } from '@pages/GamePage/ui/GameEnd'

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
    setScore(0)
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
  }

  const setEndGame = () => {
    eventBus.emit('end-game')
  }

  const onFullScreen = () => {
    console.log('Цой жив2')
    /*el = el || document.documentElement;
    if (!document.fullscreenElement && !document.mozFullScreenElement &&
        !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (el.requestFullscreen) {
        console.log('Цой жив')
        el.requestFullscreen();
      } else if (el.msRequestFullscreen) {
        el.msRequestFullscreen();
      } else if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen();
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }*/
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

  return (
    <div className={cn('index-wrapper')}>
      {step === GamePageSteps.START && (
        <>
          <div className={s['gamepage']}>
            <div className={s['topline']}>
              {bestScore > 0 && (
                <div className={s['best']}>
                  лучший счет: <span>{bestScore}</span>
                </div>
              )}
              <Button onClick={onStart}>Начать игру</Button>
            </div>
            <GameStart />
          </div>
        </>
      )}
      {step === GamePageSteps.END && (
        <div className={s['gamepage']}>
          <GameEnd score={score} bestScore={bestScore} onClick={onStart} />
        </div>
      )}
      {step === GamePageSteps.GAME && (
        <>
          <div className={s.score}>
            <div className={s.currentScore}>
              <div className={cn(s['currentScore-number'], 'h1')}>{score}</div>
              <div className={cn(s['currentScore-text'], 'h6')}>счет</div>
            </div>
            <button onClick={onFullScreen}>full</button>
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
          <div className={s['top-panel']}>
            <div className={cn(s.timer, 'h2')}>{getTimePad(time)}</div>
            <ResetButton className={s['reset']} onClick={setEndGame} />
          </div>
          <canvas className={s.gameCanvas} ref={canvasRef} />
        </>
      )}
    </div>
  )
}
