import Box from '@mui/material/Box'
import Chat from '~/pages/Chats/chat/Chat'

const Chats = () => {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} >
        <Chat />
      </Box >
    </>
  )
}
export default Chats