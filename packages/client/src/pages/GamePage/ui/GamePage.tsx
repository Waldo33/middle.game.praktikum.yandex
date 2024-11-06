import { cn } from '@shared/lib/utils'
import s from './GamePage.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Game, GameEventBus } from '@widgets/Game'
import { compareScoreWithLocalStorage, getTimePad } from '../lib/helpers'
import { ResetButton } from './ResetButton'
import { GameStart } from '@pages/GamePage/ui/GameStart'
import { GameEnd } from '@pages/GamePage/ui/GameEnd'
import { GameDifficaltyDialog } from './GameDifficaltyDialog'

export enum GamePageSteps {
  START = 'start',
  GAME = 'game',
  END = 'end',
}

export enum GameModes {
  ROUND = 'round',
  BOT = 'bot',
}

export type NumberFromOneToTen = 1 | 2 | 3 | 4 | 5 | 6

export const GamePage: FC = () => {
  const bestScore = Number(localStorage.getItem('score') || 0)
  const eventBus = GameEventBus.getInstance()

  const [step, setStep] = useState<GamePageSteps>(GamePageSteps.START)
  const [score, setScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [time, setTime] = useState(0)
  const [mode, setMode] = useState<GameModes | null>(null)
  const [difficalty, setDifficalty] = useState<NumberFromOneToTen>(1)
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const onStart = (mode: GameModes) => {
    setScore(0)
    setMode(mode)
    setStep(GamePageSteps.GAME)
  }

  const onUpdateScore = (score: number) => {
    setScore(score)
    compareScoreWithLocalStorage(score)
  }

  const onUpdateCurrentPlayerName = (name: string) => {
    setCurrentPlayerName(name)
  }

  const onUpdateBotScore = (score: number) => {
    setBotScore(score)
  }

  const onTimeUpdate = (seconds: number) => {
    setTime(seconds)
  }

  const onEndGame = () => {
    setStep(GamePageSteps.END)
    setBotScore(0)
  }

  const setEndGame = () => {
    eventBus.emit('end-game')
  }

  const onChangeDifficalty = (value: NumberFromOneToTen[]) => {
    setDifficalty(value[0])
  }

  useEffect(() => {
    if (canvasRef.current && step === GamePageSteps.GAME && mode !== null) {
      eventBus.on('current-player-name', onUpdateCurrentPlayerName)

      const game = new Game(canvasRef.current, mode, difficalty)

      eventBus.on('end-game', onEndGame)
      eventBus.on('score-update', onUpdateScore)
      eventBus.on('timer-tick', onTimeUpdate)
      eventBus.on('timer-reset', () => onTimeUpdate(0))

      if (mode === GameModes.BOT) {
        eventBus.on('bot-score-update', onUpdateBotScore)
      }
      game.start()

      return () => {
        eventBus.off('end-game', onEndGame)
        eventBus.off('score-update', onUpdateScore)
        eventBus.off('timer-tick', onTimeUpdate)
        eventBus.off('current-player-name', onUpdateCurrentPlayerName)

        if (mode === GameModes.BOT) {
          eventBus.off('bot-score-update', onUpdateBotScore)
        }
      }
    }
  }, [step, mode])

  return (
    <div className={s['index-wrapper']}>
      {step === GamePageSteps.START && (
        <>
          <div className={s['gamepage']}>
            <div className={s['topline']}>
              {bestScore > 0 && (
                <div className={s['best']}>
                  лучший счет: <span>{bestScore}</span>
                </div>
              )}
              <Button onClick={() => onStart(GameModes.ROUND)}>
                Играть с собой
              </Button>

              <GameDifficaltyDialog
                onChange={onChangeDifficalty}
                onSubmit={() => onStart(GameModes.BOT)}
                value={difficalty}
              />
            </div>
            <GameStart />
          </div>
        </>
      )}
      {step === GamePageSteps.END && !!mode && (
        <div className={s['gamepage']}>
          <GameEnd
            score={score}
            bestScore={bestScore}
            onClick={() => onStart(mode)}
          />
        </div>
      )}
      {step === GamePageSteps.GAME && (
        <>
          <div className={s.header}>
            <div className={s.score}>
              <div className={s.currentScore}>
                <div className={cn(s['currentScore-number'], 'h1')}>
                  {score}
                </div>
                <div className={cn(s['currentScore-text'], 'h6')}>
                  твой счет
                </div>
              </div>
              {mode === GameModes.ROUND && bestScore > 0 && (
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
              {mode === GameModes.BOT && <h3>{currentPlayerName}</h3>}
              <div className={s['timer-wrapper']}>
                <div className={cn(s.timer, 'h2')}>{getTimePad(time)}</div>
                <ResetButton className={s['reset']} onClick={setEndGame} />
              </div>
            </div>
            {mode === GameModes.BOT && (
              <div className={s.score}>
                <div className={s.currentScore}>
                  <div className={cn(s['currentScore-number'], 'h1')}>
                    {botScore}
                  </div>
                  <div className={cn(s['currentScore-text'], 'h6')}>
                    счет бота
                  </div>
                </div>
              </div>
            )}
          </div>
          <canvas className={s.gameCanvas} ref={canvasRef} />
        </>
      )}
    </div>
  )
}
