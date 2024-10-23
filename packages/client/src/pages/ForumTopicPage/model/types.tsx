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
  date: number | string
  author: string
  message: string
  image?: Image
}

export type CommentsList = {
  list: Comment[]
}

export type Topic = {
  title: string
  date: number | string
  author: string
  image?: Image
  content: string
}
