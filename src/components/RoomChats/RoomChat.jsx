import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import { useNavigate, useParams } from 'react-router-dom'
const RoomChat = ({ roomChat, setOpen, setRoomChatAction }) => {
  let id = useParams().id
  const navigate = useNavigate()
  const handleChooseRoom = () => {
    navigate(`/chats/${roomChat._id}`)
  }
  if (!roomChat) return null
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))
  console.log(roomChat._id === id)
  return <>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1,
        color: roomChat._id === id ? '#f0f0f0f0' : 'text.secondary',
        backgroundColor: roomChat._id === id ? '#909090' : 'inherit',
        border: roomChat._id === id ? '2px solid #f0f0f0f0' : '2px solid transparent',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        ':hover': { backgroundColor: '#909090', color: '#f0f0f0f0', iconButton: { backgroundColor: '#f0f0f0f0' } },
        borderRadius: '10px 0 0 10px',
        paddingX: 2,
      }} >

      <Box
        onClick={() => handleChooseRoom()}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',
          paddingY: 1
        }}>
        <StyledBadge
          overlap="circular"
          variant="dot"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          <Avatar src={roomChat?.avatarRoom}
            sx={{
              cursor: 'pointer',
              width: '3rem',
              height: '3rem'
            }} />
        </StyledBadge>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
          }}>
          <Typography
            variant='body1'

            sx={{
              color: 'inherit',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '60%'
            }}
          >
            {roomChat?.room_name}
          </Typography>
        </Box>
      </Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> */}
      <IconButton
        iconButton
        sx={{ backgroundColor: 'transparent' }}
        onClick={() => { setRoomChatAction(roomChat), setOpen(true) }}
      >
        <MoreHorizIcon
          sx={{
            fontSize: '25px',
            color: 'text.secondary'
          }} />
      </IconButton>
      {/* <IconButton
          onClick={() => { console.log('click') }}
          sx={{
            color: 'text.secondary',
            ':hover': { color: 'error.main' }
          }}>

          <CloseIcon sx={{ fontSize: '25px' }} />
        </IconButton> */}
      {/* </Box> */}
    </Box >
  </>
}
export default RoomChat