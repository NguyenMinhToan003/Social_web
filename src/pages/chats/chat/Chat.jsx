import Box from '@mui/material/Box'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import SendIcon from '@mui/icons-material/Send'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { socket } from '~/Socket'
import { useEffect, useState } from 'react'
import { getRoomChatMessages } from '~/api/roomChatAPI'
import { sendMessage } from '~/api/messagesAPI'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import LoadingArea from '~/components/LoadingArea'
const Chat = ({ setStatusAction, room }) => {
  const profile = useSelector(state => state.userData)
  const [chat, setChat] = useState('')
  const [loading, setLoading] = useState(false)
  const [messagesReceived, setMessagesReceived] = useState({
    members: [],
    messages: []
  })
  const fetchMessages = async () => {
    setLoading(true)
    const response = await getRoomChatMessages(room._id, profile._id)
    setLoading(false)
    if (!response?.messages?.error)
      response.messages = response.messages.map(data => {
        data.sender = data.sender[0]
        data.createdAt = dayjs(data.createdAt).format('MM/DD-HH:mm')
        return data
      })

    setMessagesReceived(response)
  }
  useEffect(() => {
    socket.emit('join_room', room._id)
    fetchMessages()
    return () => {
      socket.emit('leave_room', room._id)
    }
  }, [room._id])

  const handleReceiveMessage = (data) => {
    setMessagesReceived(prevMessages => ({
      ...prevMessages,
      messages: [...prevMessages.messages, data]
    }))
  }

  useEffect(() => {
    socket.on('receive_message', handleReceiveMessage)
    return () => {
      socket.off('receive_message', handleReceiveMessage)
    }
  }, [handleReceiveMessage])

  const handleSendChat = async () => {
    if (messagesReceived.messages.error) return toast.error(messagesReceived.messages.error)
    if (chat.trim()) {
      const time = new Date().toLocaleTimeString()
      socket.emit('receive_message', {
        room: room._id,
        message: chat,
        createdAt: time,
        sender: {
          _id: profile._id,
          name: profile.name,
          profile_picture: profile.profile_picture
        }
      })
      await sendMessage(profile._id, room._id, chat)
      setChat('')
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '10px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px', padding: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1, backgroundColor: 'background.primary' }}>
          <Tooltip title='Back'>
            <IconButton onClick={() => setStatusAction('recovery')} sx={{ color: 'error.main' }}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Button startIcon={<Avatar src={room.avatarRoom} sx={{ cursor: 'pointer', width: '40px', height: '40px' }} />}>
            <Typography variant='body1'>{room.room_name}</Typography>
          </Button>
        </Box>
        <Tooltip title='More'>
          <IconButton>
            <MoreHorizIcon sx={{ color: 'text.primary' }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', height: '100%' }}>
        {loading && <LoadingArea />}
        {
          messagesReceived.messages.error ? <Divider ><Typography sx={{ color: 'red' }}>{messagesReceived.messages.error}</Typography></Divider> :
            messagesReceived.messages.map((data, index) => {
              return <Box key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'start',
                  maxWidth: '100%',
                  flexDirection: data.sender._id === profile._id ? 'row-reverse' : 'row',
                  gap: 1,
                  padding: '5px',
                  ':hover .time': { opacity: 1, visibility: 'visible' }
                }} >
                {data.sender._id !== profile._id && <Avatar src={data.sender.profile_picture} />}
                <Typography variant='body1'
                  sx={{
                    wordBreak: 'break-word',
                    lineHeight: '1.5',
                    letterSpacing: '0.5px',
                    backgroundColor: data.sender._id === profile._id ? 'secondary.main' : '#e5e5e5',
                    color: data.sender._id === profile._id ? 'background.primary' : 'text.primary',
                    borderRadius: '20px',
                    padding: '10px 15px',
                    fontSize: '15p',
                    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)'
                  }}>
                  {data.message}
                </Typography>
                {data.userId !== profile._id && <Chip label={data.name} color='primary' />}
                <Typography variant='caption' className='time'
                  sx={{ opacity: 0, transition: 'opacity 0.3s', visibility: 'hidden', whiteSpace: 'nowrap' }} >
                  {data.createdAt}
                </Typography>
              </Box>
            })
        }
      </Box>
      <Box id='forward'></Box>
      <Divider />
      <Box sx={{ padding: '10px' }}>
        <Box
          sx={{
            backgroundColor: 'background.primary',
            height: '45px',
            width: '100%',
            border: '1px solid green',
            borderRadius: '100rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Tooltip title='Add reaction'>
              <IconButton color='error'>
                <AddReactionIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Attach file'>
              <IconButton color='warning' component='label'>
                <AttachFileIcon />
                <input type='file' style={{ display: 'none' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <input
            onChange={(e) => setChat(e.target.value)}
            value={chat}
            autoFocus
            placeholder='Write a comment...'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              width: '100%',
              height: '100%',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
          <Tooltip title='Send'>
            <IconButton color='info' onClick={handleSendChat}>
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box >
  )
}

export default Chat
