import axios from '~/api'

export const getFriends = async (id) => {
  const res = await axios.get(`/users/friends/${id}`)
  return res?.data
}
export const findUsers = async (q) => {
  const res = await axios.get(`/users/search/${q}`)
  return res?.data
}
export const addFriend = async (id, friend_id) => {
  const res = await axios.post(`/users/friends/${id}`, { friend_id })
  return res?.data
}