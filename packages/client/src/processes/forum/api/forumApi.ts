export const BASE_FORUM_API = `/api/topics`

export interface credentialsTopicProps {
  title: string
  content: string
  author: string
}

export interface credentialsCommentProps {
  content: string
  author: string
}

export const createTopic = async (credentials: credentialsTopicProps) => {
  try {
    const response = await fetch(`${BASE_FORUM_API}`, {
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

export const getAllTopics = async () => {
  try {
    const response = await fetch(`${BASE_FORUM_API}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    return await response.json()
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getTopicById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_FORUM_API}/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })

    return await response.json()
  } catch (err) {
    console.log(err)
    return null
  }
}

export const commentTopic = async (
  credentials: credentialsCommentProps,
  topicId: number
) => {
  try {
    const response = await fetch(`${BASE_FORUM_API}/${topicId}/comments`, {
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
