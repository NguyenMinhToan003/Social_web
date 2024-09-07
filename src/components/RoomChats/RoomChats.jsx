import Box from '@mui/material/Box'
import RoomChat from './RoomChat'
import { useSelector } from 'react-redux'
const RoomChats = ({ setStatusAction, setRoom }) => {
  const listRooms = useSelector(state => state.chatData)
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