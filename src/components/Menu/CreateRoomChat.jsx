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
import { OPTION } from '~/utils/MenuOptionChat'
import { socket } from '~/Socket'


const CreateRoomChat = ({ openOption, setOpenOption, setOpenMenuMain }) => {
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
    openOption === OPTION.CREATE && setOpenMenuMain(false)
    fetchFriends()
  }, [openOption])

  const handlerResetKeyword = () => {
    setKeyword('')
    setFriend(listFriendsOrigin)
  }
  const handlerSearchKeyword = (e) => {
    const k = e.target.value
    setKeyword(k)
    if (k === '') return setFriend(listFriendsOrigin)
    const res = listFriendsOrigin.filter(
      item => item.username.toLowerCase().includes(k.toLowerCase()))
    setFriend(res)
  }
  const handleChangeMenbers = (data) => {
    if (members.includes(data)) {
      setMembers(members.filter(item => item !== data))
    } else {
      setMembers([...members, data])
    }
  }
  const close = () => {
    setRoomName('')
    setMembers([])
    setOpenOption('')
  }
  const handlerCancel = () => {
    close()
    setOpenMenuMain(true)
  }

  const handlerCreateRoomChat = async () => {
    const data = {
      room_name: roomName,
      members: [profile._id, ...members.map(item => item._id)],
      avatarRoom: avatarRoom,
      type: 'group'
    }
    setLoading(true)
    const res = await createRoomChat(data)
    socket.emit('create-room-chat', {
      roomChatId: res.insertedId,
      members: data.members.slice(1)
    })
    setLoading(false)
    if (res) {
      close()
      setOpenMenuMain(false)
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
      {
        (
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
            <Box sx={{ height: '22vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex', padding: 2, gap: 1 }}>
              <Button sx={{ width: 'fit-content' }} onClick={handlerCancel} startIcon={<ArrowCircleLeftIcon />}
              >
                <Typography
                  variant='h5'
                  color='third.main'
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  CREATE ROOM
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
              height: '60vh', display: 'flex', flexDirection: 'column', border:
                '3px solid #f0f2f5', borderRadius: '10px', overflow: 'hidden', gap: 1
              , backgroundColor: '#f0f2f5'
            }}>
              <Typography variant='body1' sx={{ padding: 2, fontWeight: '600', color: 'hashtag.primary' }}>
                List friends
              </Typography>
              <Box sx={{ overflowY: 'auto', overflowX: 'none', height: '100%' }}>
                {
                  friend?.map((item, index) => {
                    return (
                      <Box key={index}
                        onClick={() => handleChangeMenbers(item)}
                        sx={{
                          marginY: 0.1,
                          backgroundColor: members?.some(member => member._id === item._id)
                            ? 'background.primary' : 'background.secondary',
                          border: members?.some(member => member._id === item._id)
                            ? '2px solid #2b54ea' : '1px solid background.primary',
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
              {
                members.length > 0 && (
                  <>
                    <Typography variant='body1'>
                      Members <span style={{ color: '#2b54ea' }}>({members.length})</span>
                    </Typography>
                    <Box sx={{ display: 'flex', padding: 1, gap: 1, flexWrap: 'wrap', overflowY: 'auto', height: '12vh', width: '100%' }}>
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
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
              <Button variant='contained' color='success' sx={{ color: 'background.primary' }} onClick={handlerCreateRoomChat} >
                Create Room Chat
              </Button>
              <Button variant='contained' color='warning' sx={{ color: 'background.primary' }} onClick={handlerCancel}>
                Cancel
              </Button>
            </Box>
          </Box>

        )
      }
    </>
  )
}

export default CreateRoomChat
