import axios from '~/api'

export const getPosts = () => {
  return axios.get('/posts')
}
export const createPost = async (authorId, title, content, media) => {
  const res = await axios.post('/posts', { author_id: authorId, title, content, media })
  return res?.data
}