import { cn } from '@shared/lib/utils'
import s from './GamePage.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/components/ui/button'
import { Game, GameEventBus } from '@widgets/Game'
import { compareScoreWithLocalStorage, getTimePad } from '../lib/helpers'
import { ResetButton } from './ResetButton'
import { GameStart } from '@pages/GamePage/ui/GameStart'
import { GameEnd } from '@pages/GamePage/ui/GameEnd'
import { GameDifficultyDialog } from './GameDifficultyDialog'
import { useFullScreen } from '@shared/hooks/useFullScreen'
import { Maximize } from 'lucide-react'
import { addUserToLeaderboard } from '@processes/leaderboard/api/leaderboardApi'
import { selectUser } from '@shared/model/selectors'
import { useSelector } from 'react-redux'

export enum GamePageSteps {
  START = 'start',
  GAME = 'game',
  END = 'end',
}

export enum GameModes {
  ROUND = 'round',
  BOT = 'bot',
}

export type Difficulty = 1 | 2 | 3 | 4 | 5

export const GamePage: FC = () => {
  const bestScore = Number(localStorage.getItem('score') || 0)
  const bestBotModeScore = Number(localStorage.getItem('bot-mode-score') || 0)

  const eventBus = GameEventBus.getInstance()
  const { canvasContainerRef, showFullScreen, isFullScreen } = useFullScreen()

  const [step, setStep] = useState<GamePageSteps>(GamePageSteps.START)
  const [score, setScore] = useState<number>(0)
  const [botScore, setBotScore] = useState<number>(0)
  const [time, setTime] = useState<number>(0)
  const [mode, setMode] = useState<GameModes | null>(null)
  const [difficulty, setDifficulty] = useState<Difficulty>(1)
  const [currentPlayerName, setCurrentPlayerName] = useState<string>('')

  const isBotMode = mode === GameModes.BOT
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const user = useSelector(selectUser),
    login = user?.login,
    avatar = user?.avatar

  const onStart = (mode: GameModes) => {
    setScore(0)
    setMode(mode)
    setStep(GamePageSteps.GAME)
  }

  const onUpdateScore = (score: number) => {
    setScore(score)
    if (isBotMode) {
      compareScoreWithLocalStorage('bot-mode-score', score)
    } else compareScoreWithLocalStorage('score', score)
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

  const setResultGame = async () => {
    const valuesResultGame = {
      data: {
        bestScore: bestScore,
        login: login,
        avatar: avatar,
      },
      ratingFieldName: 'bestScore',
    }
    await addUserToLeaderboard(valuesResultGame)
  }

  const onEndGame = () => {
    setResultGame()
    setStep(GamePageSteps.END)
    setBotScore(0)
  }

  const setEndGame = () => {
    eventBus.emit('end-game')
  }

  const onChangeDifficulty = (value: Difficulty[]) => {
    setDifficulty(value[0])
  }

  useEffect(() => {
    if (canvasRef.current && step === GamePageSteps.GAME && mode !== null) {
      eventBus.on('current-player-name', onUpdateCurrentPlayerName)

      const game = new Game(canvasRef.current, mode, difficulty)

      eventBus.on('end-game', onEndGame)
      eventBus.on('score-update', onUpdateScore)
      eventBus.on('timer-tick', onTimeUpdate)
      eventBus.on('timer-reset', () => onTimeUpdate(0))

      if (isBotMode) {
        eventBus.on('bot-score-update', onUpdateBotScore)
      }
      game.start()

      return () => {
        eventBus.off('end-game', onEndGame)
        eventBus.off('score-update', onUpdateScore)
        eventBus.off('timer-tick', onTimeUpdate)
        eventBus.off('current-player-name', onUpdateCurrentPlayerName)

        if (isBotMode) {
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
                  лучший счет в режиме игры с собой: <span>{bestScore}</span>
                </div>
              )}
              {bestBotModeScore > 0 && (
                <div className={s['best']}>
                  лучший счет в режиме игры с ботом:{' '}
                  <span>{bestBotModeScore}</span>
                </div>
              )}
              <div className={s['buttons']}>
                <Button onClick={() => onStart(GameModes.ROUND)}>
                  Играть с собой
                </Button>

                <GameDifficultyDialog
                  onChange={onChangeDifficulty}
                  onSubmit={() => onStart(GameModes.BOT)}
                  value={difficulty}
                />
              </div>
            </div>
            <GameStart />
          </div>
        </>
      )}
      {step === GamePageSteps.END && !!mode && (
        <div className={s['gamepage']}>
          <GameEnd
            score={score}
            bestScore={mode === GameModes.BOT ? bestBotModeScore : bestScore}
            onClick={() => onStart(mode)}
            onChange={() => setStep(GamePageSteps.START)}
          />
        </div>
      )}
      {step === GamePageSteps.GAME && (
        <>
          <div
            className={cn(
              s['canvas-container'],
              isFullScreen ? s['canvas-container--full'] : ''
            )}
            ref={canvasContainerRef}>
            <div>
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

                      <h6 className={cn(s['currentScore-text'], 'h6')}>
                        {bestScore}
                      </h6>
                    </div>
                  )}
                </div>
                <button
                  className={s['full-screen-icon']}
                  onClick={showFullScreen}>
                  <Maximize color="black" size={42} />
                </button>
                <div className={s['top-panel']}>
                  {isBotMode && <h3>{currentPlayerName}</h3>}
                  <div className={s['timer-wrapper']}>
                    <div className={cn(s.timer, 'h2')}>{getTimePad(time)}</div>
                    <ResetButton className={s['reset']} onClick={setEndGame} />
                  </div>
                </div>
                {isBotMode && (
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

              <canvas className={s['game-canvas']} ref={canvasRef} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
