export interface ForumListItem {
  id: number
  author: string
  title: string
  date: number
}

export type ForumTopicList = {
  list: ForumListItem[]
}
