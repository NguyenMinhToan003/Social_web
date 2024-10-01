import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Typography from '@mui/material/Typography'
import { removeMessagesById } from '~/api/messagesAPI'
import { socket } from '~/Socket'
import { useSelector } from 'react-redux'
const ModelMoreMessage = ({ open, setOpen, }) => {
  const profile = useSelector(state => state.userData)
  const handlerRemoveMessage = async () => {
    const res = await removeMessagesById(open?.data?._id, profile?._id)
    if (res) {
      socket.emit('removeMessage', { room: open?.data?.roomId, message_id: open?.data?._id })
      setOpen({ status: false, data: {} })
    }
  }
  return <>
    <Box sx={{
      scale: open.status ? 1 : 0,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '100vh',
      backgroundColor: '#00000450',
      zIndex: 10000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>

      <Box sx={{
        transition: 'all 0.25s ease-out',
        scale: open.status ? 1 : 0,
        minWidth: '50%',
        maxWidth: '70%',
        minHeight: '50%',
        maxHeight: '70%',
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        padding: '10px',
        padding: 1
      }}>

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1
        }}>
          <Button >
            {open?.data?.sender?.username}
          </Button>
          <IconButton onClick={() => setOpen({ status: false, data: {} })}>
            <HighlightOffIcon sx={{ color: 'error.main', fontSize: '30px' }} />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          marginTop: 1,
          height: '350px',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexDirection: 'column',
          overflowY: 'auto',
          overFlowX: 'hidden'
        }}>
          <Typography variant='body1' color='text.primary'>
            {open?.data?.message}
          </Typography>

        </Box>
        <Button variant='contained' color='warning' onClick={handlerRemoveMessage}>
          <Typography variant='body1' color='#f0f2f5'>
            hidden
          </Typography>
        </Button>
      </Box>
    </Box>
  </>
}
export default ModelMoreMessage