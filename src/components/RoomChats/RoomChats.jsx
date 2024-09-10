import Box from '@mui/material/Box'
import RoomChat from './RoomChat'
import { getFriends } from '~/api/userAPI'
import RoomChatFriend from './RoomChatFriend'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getRoomChats } from '~/api/roomChatAPI'
const RoomChats = ({ setRoom }) => {
  const profile = useSelector(state => state.userData)
  const [listRooms, setListRooms] = useState([])
  const [friends, setFriends] = useState([])

  const fetchRooms = async () => {
    let resRoom = await getRoomChats(profile._id)
    setListRooms(resRoom)
    let resFriend = await getFriends(profile._id)
    const friendsNonRoomChat = resFriend.filter(friend => {
      return !resRoom.some(room => room.type === 'private' && room.members.includes(friend._id))
    })
    setFriends(friendsNonRoomChat)
  }
  useEffect(() => {
    fetchRooms()
  }, [])
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', padding: '10px' }}>
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