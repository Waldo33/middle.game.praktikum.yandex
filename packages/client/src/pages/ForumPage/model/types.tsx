export interface ForumListItem {
  id: number
  author: string
  title: string
  createdAt: Date
  updatedAt: Date
}

export type ForumTopicList = {
  list: ForumListItem[]
}
