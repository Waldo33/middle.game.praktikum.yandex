import { FC, useState, useEffect } from 'react'
import { Intro } from '@widgets/intro/Intro'
import {
  LeaderboardTable,
  Leaderboard,
} from '@widgets/leaderboardtable/LeaderboardTable'
import { getLeaderboard } from '@processes/leaderboard/api/leaderboardApi'
import s from './LeaderboardPage.module.scss'

export const LeaderboardPage: FC = () => {
  const [userList, setUserList] = useState('')

  interface UserDataProps {
    data: {
      bestScore: number
      login: string | undefined
      avatar?: string | undefined
    }
  }

  useEffect(() => {
    const setResultGame = async () => {
      const usersResultValues = {
        ratingFieldName: 'bestScore',
        cursor: 0,
        limit: 10,
      }

      const leaderboardData = await getLeaderboard(usersResultValues)
      const leaderboardDataValue = leaderboardData.map(
        (el: UserDataProps) => el.data
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
