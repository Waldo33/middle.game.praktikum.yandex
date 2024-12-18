export interface ForumListItem {
  id: number
  author: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export type ForumTopicList = {
  list: ForumListItem[]
}
