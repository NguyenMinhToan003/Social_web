import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import { getFriends } from '~/api/userAPI'
import { useSelector } from 'react-redux'
import { Avatar, Chip, IconButton } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import BackspaceIcon from '@mui/icons-material/Backspace'
import { createRoomChat } from '~/api/roomChatAPI'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loading from '~/components/Loading'

const CreateRoomChat = ({ open, setOpen, setOpenMenu }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const profile = useSelector(state => state.userData)
  const [listFriendsOrigin, setListFriendsOrigin] = useState([])
  const [keyword, setKeyword] = useState('')

  const [roomName, setRoomName] = useState('')
  const [friend, setFriend] = useState([])
  const [members, setMembers] = useState([])
  const [avatarRoom, setAvatarRoom] = useState()
  const fetchFriends = async () => {
    const resFriend = await getFriends(profile._id)
    setListFriendsOrigin(resFriend)
    setFriend(resFriend)
  }
  const handleChangeFile = (e) => {
    setAvatarRoom(URL.createObjectURL(e.target.files[0]))
  }

  useEffect(() => {
    fetchFriends()
  }, [open])
  const handlerResetKeyword = () => {
    setKeyword('')
    setFriend(listFriendsOrigin)
  }
  const handlerSearchKeyword = (e) => {
    const k = e.target.value
    setKeyword(k)
    if (k === '') return setFriend(listFriendsOrigin)
    const res = listFriendsOrigin.filter(item => item.username.includes(k))
    setFriend(res)
  }
  const handleChangeMenbers = (data) => {
    if (members.includes(data)) {
      setMembers(members.filter(item => item !== data))
    } else {
      setMembers([...members, data])
    }
  }
  const handlerCancel = () => {
    setRoomName('')
    setMembers([])
    setOpen(false)
  }

  const handlerCreateRoomChat = async () => {
    const data = {
      room_name: roomName,
      members: [...members.map(item => item._id), profile._id],
      avatarRoom: avatarRoom,
      type: 'group'
    }
    setLoading(true)
    const res = await createRoomChat(data)
    setLoading(false)
    if (res) {
      setMembers([])
      setOpen(false)
      setOpenMenu(false)
      navigate(`/chats/${res.insertedId}`)
      toast.success('Create room chat success')
    }

    else toast.error('Create room chat fail')
  }
  const handlerReseRoomname = () => {
    setRoomName('')
  }

  return (
    <>
      {
        loading && <Loading />
      }
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
            maxWidth: '70%',
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
                onChange={handleChangeFile}
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

              <Box sx={{
                position: 'relative', height: '50px',
                width: '100%',
              }}>
                <input
                  autoFocus
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder='Room Name'
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    fontSize: '17px',
                    border: 'none',
                    borderBottom: '1.5px solid #2b54ea',
                  }}
                />
                {
                  roomName && (
                    <IconButton sx={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                      onClick={handlerReseRoomname}
                    >
                      <BackspaceIcon />
                    </IconButton>
                  )
                }
              </Box>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <input
                value={keyword}
                onChange={handlerSearchKeyword}
                placeholder="Search"
                style={{
                  width: '100%',
                  padding: '10px 20px',
                  fontSize: '17px',
                  border: '1.2px solid #6b6d71',
                  borderRadius: '25px',
                }}
              />
              {
                keyword && (
                  <IconButton sx={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                    onClick={handlerResetKeyword}
                  >
                    <BackspaceIcon />
                  </IconButton>
                )
              }
            </Box>
          </Box>
          <Divider />
          <Box sx={{
            height: '50vh', display: 'flex', flexDirection: 'column', border:
              '1.2px solid black', borderRadius: '10px', overflow: 'hidden', gap: 1
          }}>
            <Typography variant='body1' sx={{ padding: 2, fontWeight: '600' }}>
              List friends
            </Typography>
            <Box sx={{ overflowY: 'auto', overflowX: 'none', height: '100%' }}>
              {
                friend?.map((item, index) => {
                  return (
                    <Box key={index}
                      onClick={() => handleChangeMenbers(item)}
                      sx={{
                        backgroundColor: members?.some(member => member._id === item._id)
                          ? 'background.primary' : 'background.secondary',
                        display: 'flex', gap: 2, padding: 2,
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderTop: '1px solid #f2f4f6',
                        borderBottom: '1px solid #f2f4f6',
                      }}>
                      {
                        members?.some(member => member._id === item._id)
                          ? <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                          : <RadioButtonUncheckedIcon sx={{ color: 'secondary.main' }} />
                      }

                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                        <Avatar src={item.profile_picture} />
                      </Box>

                      <Typography variant='body1' >
                        {item.username}
                      </Typography>
                    </Box>
                  )
                })
              }
            </Box>

          </Box>
          {
            members.length > 0 && (
              <>
                <Typography variant='body1'>
                  Members <span style={{ color: '#2b54ea' }}>({members.length})</span>
                </Typography>
                <Box sx={{ display: 'flex', padding: 1, gap: 1, flexWrap: 'wrap', overflowY: 'auto', height: '12vh' }}>
                  {
                    members.map((item, index) => {
                      if (item._id === profile._id) return null
                      return (
                        <Box>
                          <Chip
                            key={index}
                            avatar={<Avatar src={item.profile_picture} />}
                            label={item.username}
                            sx={{ height: 35 }}
                            color='default'
                            onDelete={() => handleChangeMenbers(item)}
                          />
                        </Box>
                      )
                    })
                  }
                </Box>
              </>
            )
          }
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
            <Button variant='contained' color='success' sx={{ color: 'background.primary' }} onClick={handlerCreateRoomChat} >
              Create Room Chat
            </Button>
            <Button variant='contained' color='warning' sx={{ color: 'background.primary' }} onClick={handlerCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export default CreateRoomChat
