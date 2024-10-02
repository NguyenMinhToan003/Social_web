import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import { OPTION } from '~/utils/MenuOptionChat'
import Avatar from '@mui/material/Avatar'
import { getListUserByListId } from '~/api/userAPI'
import { useSelector } from 'react-redux'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import TextField from '@mui/material/TextField'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { IconButton } from '@mui/material'
const MembersRoomChat = ({ openOption, setOpenOption, setOpenMenuMain, roomChat }) => {
  const profile = useSelector(state => state.userData)
  console.log('roomChat', roomChat)
  const [listMembersOrigin, setListMembersOrigin] = useState([])
  const [keyword, setKeyword] = useState('')
  const [listMembers, setListMembers] = useState([])
  const fetchFriend = async () => {
    const res = await getListUserByListId(profile._id, roomChat.members)
    setListMembersOrigin(res)
    console.log('listMembersOrigin', listMembersOrigin)
    setListMembers(res)

  }
  useEffect(() => {
    openOption === OPTION.MEMBER && setOpenMenuMain(false)
    fetchFriend()
  }, [openOption])
  const handerSeachKey = (e) => {
    const k = e.target.value
    setKeyword(k)
    if (k === '') return setListMembers(listMembersOrigin)
    console.log('listMembersOrigin', listMembersOrigin)
    const list = listMembersOrigin.filter(item => item.username.toLowerCase().includes(k.toLowerCase()))
    console.log('list', list)
    setListMembers(list)
  }
  const handlerCancel = () => {
    setOpenOption('')
    setOpenMenuMain(true)
  }
  return <>
    <Box
      sx={{
        minWidth: 600,
        maxWidth: '75%',
        minHeight: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: '10px',
        padding: 1,
        overflowY: 'auto',
        overflowX: 'none',
      }}
    >
      <Box sx={{ height: '15vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 2, gap: 1 }}>
        <Button sx={{ width: 'fit-content' }}
          onClick={handlerCancel} startIcon={<ArrowCircleLeftIcon />}
        >
          <Typography
            variant='h5'
            color='third.main'
            sx={{
              fontWeight: 'bold',
            }}
          >
            MEMBERS ROOM
          </Typography>
        </Button>
        <TextField
          variant='outlined'
          label='Search'
          value={keyword}
          onChange={handerSeachKey}
        />
        <Divider />
      </Box>
      <Box sx={{
        margin: 1,
        height: '60vh', display: 'flex', flexDirection: 'column', border:
          '3px solid #f0f2f5', borderRadius: '10px', overflow: 'hidden', gap: 1
        , backgroundColor: '#f0f2f5'
      }}>
        <Typography variant='body1' sx={{ padding: 2, fontWeight: '600', color: 'hashtag.primary' }}>
          List Memebers
        </Typography>
        <Box sx={{ overflowY: 'auto', overflowX: 'none', height: '100%' }}>
          {
            listMembers?.map((item, index) => {
              console.log(roomChat.members.includes(item._id))
              return (
                <Box key={index}
                  onClick={() => handleChangeMenbers(item)}
                  sx={{
                    marginY: 0.1,
                    backgroundColor: 'background.secondary',
                    border: '2px solid #2b54ea',
                    display: 'flex', gap: 2, padding: 2,
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderTop: '1px solid #f2f4f6',
                    borderBottom: '1px solid #f2f4f6',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: '#f0f2f5',
                      '& .remove': {
                        display: 'block',

                      }
                    }
                  }}>
                  {
                    roomChat?.admins.includes(item._id)
                      ? <WorkspacePremiumIcon sx={{ color: 'secondary.main' }} />
                      : roomChat?.admins.includes(profile._id)
                        ? <CheckCircleIcon sx={{ color: 'info.main' }} />
                        : ''
                  }

                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                    <Avatar src={item.profile_picture} />
                  </Box>

                  <Typography variant='body1' >
                    {item.username}
                  </Typography>
                  <Box className='remove' sx={{ position: 'absolute', top: '50%', right: 2, transform: 'translateY(-50%)', display: 'none', backgroundColor: '#f0f2f5', borderRadius: '100rem' }}>
                    <IconButton>
                      <RemoveCircleOutlineIcon sx={{ color: 'error.main' }} />
                    </IconButton>
                  </Box>
                </Box>
              )
            })
          }
        </Box>

      </Box>

      <Button>
        <Typography variant='body1' sx={{ color: 'info.main' }}>
          Add Members
        </Typography>
      </Button>
      <Button> <Typography variant='body1' sx={{ color: 'info.main' }}>
        Save
      </Typography></Button>

    </Box >
  </>
}
export default MembersRoomChat