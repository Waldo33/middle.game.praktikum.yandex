import { FC, useState, useEffect } from 'react'
import { Intro } from '@widgets/intro/Intro'
import { LeaderboardTable, Leaderboard } from './LeaderboardTable'
import { getLeaderboard } from '@processes/leaderboard/api/leaderboardApi'
import s from './LeaderboardPage.module.scss'

export const LeaderboardPage: FC = () => {
  const [userList, setUserList] = useState<Leaderboard[] | null>(null)

  useEffect(() => {
    const setResultGame = async () => {
      const leaderboardData = await getLeaderboard()
      setUserList(leaderboardData)
    }
    setResultGame()
  }, [])

  return (
    <main className="index-wrapper">
      <Intro />
      <h1 className="mt-4">Лидерборд</h1>
      <div className={s['leaderboardpage']}>
        {userList?.length ? <LeaderboardTable list={userList} /> : ''}
      </div>
    </main>
  )
}
