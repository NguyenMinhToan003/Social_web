import axios from '~/api'
export const getNotifications = async (userId) => {
  const res = await axios.get(`/notifications/${userId}`)
  return res?.data
}