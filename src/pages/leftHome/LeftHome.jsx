import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Recovery from '~/components/Recovery/Recovery'
import { useEffect, useState } from 'react'
const LeftHome = () => {
  // const [statusAction, setStatusAction] = useState('recovery')
  const [room, setRoom] = useState([])
  useEffect(() => {
  }, [room])
  return (
    <>
      <Box sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: theme => theme.socialMedia.widthRight, padding: 1, display: { sm: 'none', lg: 'block' }, flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
        {
          <Recovery setRoom={setRoom} />
        }
        {/* {
          statusAction === 'chat' && <Chat setStatusAction={setStatusAction} room={room} />
        } */}
      </Box>

    </>
  )
}
export default LeftHome