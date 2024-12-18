export type Details = {
  date: number | string
  author: string
  comment?: boolean
}

export type Image = {
  url: string
  name: string
}

export type Comment = {
  id: number
  author: string
  content: string
  topicId: number
  parentId: number
  createdAt: string
  updatedAt: string
}

export type CommentsList = {
  list: Comment[]
}

export type Topic = {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
}
