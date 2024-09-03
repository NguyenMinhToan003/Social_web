import axios from '~/api'
export const getRoomChats = async () => {
  const res = await axios.get('/room_chats/listRoomChats')
  return res.data
}
export const getRoomChatMessages = async (roomId, userId) => {
  const res = await axios.get(`/room_chats/${roomId}&&${userId}`)
  return res.data
}