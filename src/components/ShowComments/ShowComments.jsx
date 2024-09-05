import React, { useEffect, useState } from 'react'
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import DialogContentText from '@mui/material/DialogContentText'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import Tooltip from '@mui/material/Tooltip'
import avatar from '~/assets/avatar.png'
import ListComments from './ListComments'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import AddReactionIcon from '@mui/icons-material/AddReaction'
import { getCommentsByPostId, sendComment } from '~/api/comments.js'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { socket } from '~/Socket'
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ShowComments = ({ setShowComment, post_id }) => {
  const [chat, setChat] = React.useState('')
  const user = useSelector(state => state.userData)
  const [comments, setComments] = useState([])
  const fetchComments = async () => {
    const res = await getCommentsByPostId(post_id)
    setComments(res)
  }
  useEffect(() => {
    socket.emit('join_room', post_id)
    fetchComments()
    return () => {
      socket.emit('leave_room', post_id)
    }
  }, [post_id])
  const handleReceiveComment = (data) => {
    setComments(prevComments => [data, ...prevComments])
  }
  useEffect(() => {
    socket.on('receive_comment', handleReceiveComment)
    return () => {
      socket.off('receive_comment', handleReceiveComment)
    }
  }, [handleReceiveComment])
  const handleSendChat = async () => {
    if (chat) {
      const content = chat
      const author_id = user._id
      const res = await sendComment(post_id, author_id, content)

      if (res.acknowledged) {
        const newComment = { post_id, content, author: [{ profile_picture: user.profile_picture, username: user.username }], createdAt: new Date() }
        socket.emit('send_comment', newComment)
        toast.success('Comment sent')
        setChat('')
      }

    }
  }
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth="xl"
      sx={{ background: 'background.primary', minHeight: '100vh' }}
    >
      <DialogTitle component="div" disableTypography
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Button variant="text" endIcon={<ArrowForwardIosIcon />}>
            {comments.length} Comments
          </Button>
          <IconButton
            onClick={() => setShowComment(false)}
            sx={{ background: 'background.secondary', color: '#f23d5b' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img
            src={avatar}
            alt="avatar"
            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          />
          <Box
            sx={{
              backgroundColor: 'background.primary',
              width: '100%',
              border: '1px solid green',
              borderRadius: '100rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Tooltip title="Add reaction">
                <IconButton color='error'>
                  <AddReactionIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach file">
                <IconButton color='warning' component="label">
                  <AttachFileIcon />
                  <input type='file' style={{ display: 'none' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <input
              onChange={(e) => setChat(e.target.value)}
              value={chat}
              autoFocus
              placeholder="Write a comment..."
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                width: '100%',
                height: '100%',
                outline: 'none',
                fontSize: '1rem'
              }}
            />
            <Tooltip title="Send">
              <IconButton color="info" onClick={handleSendChat}>
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ width: '100%' }}>
        <DialogContentText>
          <ListComments comments={comments} />
        </DialogContentText>
      </DialogContent>
      <DialogActions />
    </Dialog>
  )
}

export default ShowComments
