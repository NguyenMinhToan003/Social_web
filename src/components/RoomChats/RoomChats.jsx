import Box from '@mui/material/Box'
import RoomChat from './RoomChat'
import { getFriends } from '~/api/userAPI'
import RoomChatFriend from './RoomChatFriend'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
const RoomChats = ({ setRoom }) => {
  const profile = useSelector(state => state.userData)
  let listRooms = useSelector(state => state.chatData)
  const [friends, setFriends] = useState([])
  const fetchFriends = async () => {
    const res = await getFriends(profile._id)
    const friendsNonRoomChat = res.filter(friend => {
      return !listRooms.some(room => room.members.includes(friend._id))
    })
    setFriends(friendsNonRoomChat)
  }

  useEffect(() => {
    fetchFriends()
  }, [])
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', overflowX: 'hidden', padding: '10px' }}>
      {
        friends?.map((data, index) => {
          return <RoomChatFriend key={index} friend={data} setRoom={setRoom} />
        })
      }
      {
        listRooms?.map((data, index) => {
          return <RoomChat key={index} roomChat={data} setRoom={setRoom} />
        })
      }
    </Box>
  </>
}
export default RoomChats