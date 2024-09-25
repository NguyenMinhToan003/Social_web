import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt'
import Button from '@mui/material/Button'
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt'
import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
const Comment = ({ comment }) => {

  const originalLike = comment.like || 10
  const [numberLike, setNumberLike] = useState(comment.like || 10)
  const [like, setLike] = useState({ back: 'none', now: 'none' })
  const time = new Date(comment?.createdAt)
  const day = time.toLocaleDateString()
  return <>
    <Box sx={{
      display: 'flex',
      gap: 2,
      justifyContent: 'space-between',
      alignItems: 'start',
      width: '100%'
    }}>
      <Box sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'start',
        alignItems: 'start',
        width: '100%'
      }}>
        <img src={comment?.author[0]?.profile_picture}
          alt='avatar'
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%'
          }} />
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              justifyContent: 'space-between'
            }}>
            <Typography
              variant='body1'
              color='text.primary'
              sx={{
                fontSize: '15px',
                fontWeight: 'bold'
              }}>
              @{comment?.author[0]?.username}
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ fontSize: '13px' }}
            >
              {day}
            </Typography>
          </Box>
          <Typography color='text.primary' sx={{ fontSize: '15px' }}>
            {comment?.content}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button startIcon={like.now === 'like'
              ? <ThumbUpIcon />
              : <ThumbUpOffAltIcon />}
              onClick={() => {
                (like.now === 'like')
                  ? (setLike({ back: like.now, now: 'none' }),
                    like.back === 'like'
                      ? setNumberLike(originalLike - 1)
                      : setNumberLike(originalLike))
                  : (setLike({ back: like.now, now: 'like' }),
                    setNumberLike(originalLike + 1))
              }} sx={{ fontSize: '0.8rem' }}>{numberLike}
            </Button>
            <IconButton onClick={() => {
              (like.now === 'dislike')
                ? (setLike({ back: like.now, now: 'none' }),
                  like.back === 'dislike'
                    ? setNumberLike(originalLike + 1)
                    : setNumberLike(originalLike))
                : (setLike({ back: like.now, now: 'dislike' }), numberLike > 0
                  ? setNumberLike(originalLike - 1)
                  : setNumberLike(0))
            }}>
              {like.now === 'dislike'
                ? <ThumbDownAltIcon sx={{ fontSize: '1.2rem' }} />
                : <ThumbDownOffAltIcon sx={{ fontSize: '1.2rem' }} />}
            </IconButton>
          </Box>
        </Box>
      </Box >
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box >
  </>
}
export default Comment