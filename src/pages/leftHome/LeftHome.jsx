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
      <Box sx={{ position: 'fixed', top: '0', right: '0', bottom: '0', width: theme => theme.socialMedia.widthRight, padding: '10px', display: { sm: 'none', lg: 'flex' }, flexDirection: 'column', backgroundColor: '#f0f2f5' }}>
        {
          <Recovery setRoom={setRoom} />
        }
        {/* {
          statusAction === 'chat' && <Chat setStatusAction={setStatusAction} room={room} />
        } */}
      </Box>
      <Divider orientation="vertical" sx={{ position: 'fixed', right: theme => theme.socialMedia.widthRight, top: '0', bottom: '0', margin: '0', display: { sm: 'none', lg: 'block' } }} />
    </>
  )
}
export default LeftHome