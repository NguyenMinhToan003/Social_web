import Typography from '@mui/material/Typography'

import RoomChats from '~/components/RoomChats/RoomChats'

const Recovery = ({ setRoom }) => {
  return (
    <>
      <Typography variant='h6' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Room Chats
      </Typography>
      <RoomChats setRoom={setRoom} />
    </>
  )
}
export default Recovery