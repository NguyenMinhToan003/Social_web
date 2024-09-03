import axios from '~/api'

export const getPosts = () => {
  return axios.get('/posts')
}