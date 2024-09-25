import axios from '~/api'
export const getRoomChats = async (userId) => {
  const res = await axios.get(`/room_chats/listRoomChats/${userId}`)
  console.log(res?.data)
  return res?.data
}
export const getRoomChatMessages = async (roomId, userId) => {
  const res = await axios.get(`/room_chats/${roomId}&&${userId}`)
  return res?.data
}
export const createRoomChat = async (data) => {
  const res = await axios.post('/room_chats/createRoomChat', data)
  return res?.data
}
export const removeRoomChat = async (id, user_id) => {
  console.log(id, user_id)
  const res = await axios.delete('/room_chats', { data: { id, user_id } })
  return res?.data
}
