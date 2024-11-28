export const BASE_LEADERBOARD_API = `${
  import.meta.env.VITE_API_URL
}/leaderboard`

export interface UserLeaderboardProps {
  data: {
    bestScore: number
    login: string | undefined
    avatar: string | undefined
  }
  ratingFieldName: string
}

export interface LeaderboardProps {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const addUserToLeaderboard = async (
  credentials: UserLeaderboardProps
) => {
  try {
    const response = await fetch(`${BASE_LEADERBOARD_API}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })
    if (!response.ok) {
      await response.json()
    }
  } catch (err) {
    console.log(err)
  }

  return true
}

export const getLeaderboard = async (credentials: LeaderboardProps) => {
  try {
    const response = await fetch(`${BASE_LEADERBOARD_API}/all`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
      credentials: 'include',
    })

    return await response.json()
  } catch (err) {
    console.log(err)
    return null
  }
}
