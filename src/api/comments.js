import axios from '~/api'

export const getCommentsByPostId = async (postId) => {
  const res = await axios.get(`/comments/${postId}`)
  return res?.data
}

export const sendComment = async (post_id, author_id, content) => {
  const res = await axios.post('/comments', { post_id, content, author_id })
  return res?.data
}
