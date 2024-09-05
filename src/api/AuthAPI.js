import axios from '~/api'
export const getDataUser = async (account, password) => {
  const res = await axios.post('/auth/login', { account, password })
  return res?.data
}
export const registerUser = async (username, email, password) => {
  const res = await axios.post('/auth/register', { username, email, password })
  return res?.data
}