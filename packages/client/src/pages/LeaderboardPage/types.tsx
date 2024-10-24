export type Leaderboard = {
  place: number
  playerName: string
  playerAvatar: string
  amount: number
}

export type LeaderboardListProps = {
  list: Leaderboard[]
}
