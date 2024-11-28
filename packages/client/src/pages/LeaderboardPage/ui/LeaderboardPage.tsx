import { FC, useState, useEffect } from 'react'
import { Intro } from '@widgets/intro/Intro'
import { LeaderboardTable } from '@widgets/leaderboardtable/LeaderboardTable'
import { getLeaderboard } from '@processes/leaderboard/api/leaderboardApi'

export const LeaderboardPage: FC = () => {
  /*  let players = [
    {
      place: 1,
      playerName: 'username1',
      playerAvatar: 'https://github.com/shadcn.png',
      amount: 2500,
    },
    {
      place: 2,
      playerName: 'username2',
      playerAvatar: 'https://avatars.githubusercontent.com/u/3218960',
      amount: 2000,
    },
    {
      place: 3,
      playerName: 'username3',
      playerAvatar: 'https://avatars.githubusercontent.com/u/104268071',
      amount: 1500,
    },
    {
      place: 4,
      playerName: 'username4',
      playerAvatar: 'https://avatars.githubusercontent.com/u/835489',
      amount: 1000,
    },
    {
      place: 5,
      playerName: 'username5',
      playerAvatar: 'https://avatars.githubusercontent.com/u/5285425',
      amount: 500,
    },
  ]*/

  const [joke, setJoke] = useState('')

  useEffect(() => {
    const setResultGame = async () => {
      const usersResult = {
        ratingFieldName: 'bestScore',
        cursor: 0,
        limit: 10,
      }

      const leaderboardData = await getLeaderboard(usersResult)
      //const value = leaderboardData.map(el => el.data)
      //setJoke(value)
    }
    setResultGame()
  }, [])

  console.log(Array.from(joke))

  const test = Array.from(joke)

  console.log(test)

  return (
    <main className="index-wrapper">
      <Intro />
      <h1 className="mt-4">Лидерборд</h1>
      {/*<LeaderboardTable list={test} />*/}
    </main>
  )
}
