import { FC, useState, useEffect } from 'react'
import { Intro } from '@widgets/intro/Intro'
import { LeaderboardTable } from '@widgets/leaderboardtable/LeaderboardTable'
import {
  getLeaderboard,
  UserLeaderboardBasicProps,
} from '@processes/leaderboard/api/leaderboardApi'
import s from './LeaderboardPage.module.scss'

export interface UserLeaderboardExtraProps {
  data: UserLeaderboardBasicProps
}

export const LeaderboardPage: FC = () => {
  const [userList, setUserList] = useState('')

  useEffect(() => {
    const setResultGame = async () => {
      const leaderboardData = await getLeaderboard()
      const leaderboardDataValue = leaderboardData.map(
        (el: UserLeaderboardExtraProps) => el.data
      )
      setUserList(leaderboardDataValue)
    }
    setResultGame()
  }, [])

  const users: any[] = Array.from(userList)

  return (
    <main className="index-wrapper">
      <Intro />
      <h1 className="mt-4">Лидерборд</h1>
      <div className={s['leaderboardpage']}>
        <LeaderboardTable list={users} />
      </div>
    </main>
  )
}
