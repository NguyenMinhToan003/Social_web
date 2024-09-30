import axios from '~/api'
export const getMessages = async (roomId, userId) => {
  const res = await axios.get(`/messages/${roomId}&&${userId}`)
  return res?.data
}
export const sendMessage = async (roomId, userId, message) => {
  const res = await axios.post('/messages', { 'sender_id': roomId, 'room_chat_id': userId, 'message': message })
  return res?.data
}

export const removeMessagesById = async (id) => {
  const res = await axios.put(`/messages/${id}`)
  return res?.data
}