import axios from '~/api'

export const getFriends = async (id) => {
  const res = await axios.get(`/users/friends/${id}`)
  return res?.data
}