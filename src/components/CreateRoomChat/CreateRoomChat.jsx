import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import { getFriends } from '~/api/userAPI'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'
const CreateRoomChat = ({ open, setOpen }) => {

  const profile = useSelector(state => state.userData)
  const [friend, setFriend] = useState([])
  const [members, setMembers] = useState([])
  const [avatarRoom, setAvatarRoom] = useState()
  const fetchFriends = async () => {
    const resFriend = await getFriends(profile._id)
    setFriend(resFriend)
  }
  const handleChangeFile = (e) => {
    setAvatarRoom(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    fetchFriends()
  }, [open])
  useEffect(() => {
    console.log('avatarRoom', avatarRoom)
  }, [avatarRoom])

  const handleChangeMenbers = (data) => {
    if (members.includes(data)) {
      setMembers(members.filter(item => item !== data))
    } else {
      setMembers([...members, data])
    }
  }
  const handlerCancel = () => {
    setMembers([])
    setOpen(false)
  }
  useEffect(() => {
    console.log('members', members)
  }, [members])
  return (
    <>
      <Box
        sx={{
          transition: 'all 0.25s ease-out',
          scale: open ? 1 : 0,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          zIndex: 100000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <Box
          sx={{
            minWidth: '70%',
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
          <Box sx={{ height: '25vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex', padding: 2, gap: 1 }}>
            <Button sx={{ width: 'fit-content' }} onClick={handlerCancel} startIcon={<ArrowCircleLeftIcon />}
            >
              <Typography
                variant='h5'
                color='third.main'
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Create Room Chat
              </Typography>
            </Button>
            <Divider />
            <Box sx={{
              display: 'flex', gap: 3, alignItems: 'center'
            }}>
              <input
                onChange={(e) => handleChangeFile(e)}
                type='file'
                id='profileRoomChatCreate'
                style={{ display: 'none' }}
              />
              <label htmlFor='profileRoomChatCreate'>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 65,
                    height: 65,
                    borderRadius: '50%',
                    backgroundColor: 'background.paper',
                    border: '4px solid #f2f4f6',
                  }}
                >
                  {avatarRoom ? (
                    <img src={avatarRoom} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', zIndex: 10000000000 }} />
                  ) : (
                    <CameraAltIcon />
                  )}
                </Box>
              </label>

              <input
                autoFocus
                placeholder='Room Name'
                style={{
                  height: '50px',
                  width: '100%',
                  padding: '10px 0',
                  fontSize: '17px',
                  border: 'none',
                  borderBottom: '1.5px solid #2b54ea',
                }}
              />
            </Box>
            <Box>
              <input
                placeholder="Search"
                style={{
                  width: '100%',
                  padding: '10px 20px',
                  fontSize: '17px',
                  border: '1.2px solid #6b6d71',
                  borderRadius: '25px',
                }}
              />
            </Box>
          </Box>
          <Divider />
          <Box sx={{ height: '45vh', display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body1' sx={{ padding: 2, fontWeight: '600' }}>
              List friends
            </Typography>
            <Box sx={{ overflowY: 'auto', overflowX: 'none', height: '100%' }}>
              {
                friend.map((item, index) => {
                  return (
                    <Box key={index}
                      sx={{
                        display: 'flex', gap: 2, padding: 2,
                        alignItems: 'center',
                        ':hover': { backgroundColor: 'background.primary' }
                      }}>
                      <input
                        type='checkbox'
                        onChange={() => handleChangeMenbers(item)} />
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                        <Avatar src={item.profile_picture} />
                      </Box>

                      <Typography variant='body1' sx={{ fontWeight: '600' }}>
                        {item.username}
                      </Typography>
                    </Box>
                  )
                })
              }
            </Box>
            <Box>
              <Button >
                Create Room Chat
              </Button>
              <Button>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default CreateRoomChat
