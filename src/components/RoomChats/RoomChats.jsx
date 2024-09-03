import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import RoomChat from './RoomChat'
import { getRoomChats } from '~/api/roomChatAPI'
const RoomChats = ({ setStatusAction, setRoom }) => {
  const [listRooms, setListRooms] = useState([])
  const fetchRoomChats = async () => {
    const response = await getRoomChats()
    setListRooms(response)
  }
  useEffect(() => {
    fetchRoomChats()
  }, [])
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', overflowX: 'hidden', padding: '10px' }}>
      {
        listRooms?.map((data, index) => {
          return <RoomChat key={index} roomChat={data} setStatusAction={setStatusAction} setRoom={setRoom} />
        })
      }
    </Box>
  </>
}
export default RoomChats