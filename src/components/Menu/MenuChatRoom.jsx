import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Divider from '@mui/material/Divider'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { removeRoomChat } from '~/api/roomChatAPI'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import GroupsIcon from '@mui/icons-material/Groups'
import InfoIcon from '@mui/icons-material/Info'
import { useState } from 'react'
import MenuChatOption from '~/components/Menu/MenuChatOption'
import { OPTION } from '~/utils/MenuOptionChat'
const MenuChatRoom = ({ roomChatAction, setOpen, open, roomChat }) => {
  const [openOption, setOpenOption] = useState('')
  const navigate = useNavigate()
  const profile = useSelector(state => state.userData)
  const handlerRemoveRoomChat = async () => {
    const res = await removeRoomChat(roomChatAction?._id, profile?._id)
    if (res) {
      setOpen(false)
      toast.success(`Remove ${roomChatAction?.room_name} success`)
      navigate('/roomchats')
    }
  }
  const hanndlerCreateRoomChat = () => {
    setOpenOption(OPTION.CREATE)
  }
  const handleMembersRoomChat = () => {
    setOpenOption(OPTION.MEMBER)
  }

  return (
    <>
      <MenuChatOption openOption={openOption} setOpenOption={setOpenOption} setOpenMenuMain={setOpen} roomChat={roomChat} />
      <Box sx={{
        scale: open ? 1 : 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        backgroundColor: '#00000650',
        zIndex: 10000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <Box sx={{
          transition: 'all 0.25s ease-out',
          scale: open ? 1 : 0,
          minWidth: '50%',
          minHeight: '50%',
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
            <Button
              startIcon={<Avatar src={roomChatAction?.avatarRoom} />}
            >
              {roomChatAction?.room_name}
            </Button>
            <IconButton onClick={() => setOpen(false)}>
              <HighlightOffIcon sx={{ color: 'error.main', fontSize: '30px' }} />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            alignItems: 'center',
            marginTop: 1
          }}>
            <Button
              onClick={hanndlerCreateRoomChat}
              startIcon={<GroupAddIcon />}
              sx={{ color: 'blue', }}>
              Create Group
            </Button>
            <Button
              startIcon={<DeleteOutlineIcon />}
              sx={{ color: 'red' }}
              onClick={handlerRemoveRoomChat}
            >
              Remove Chat
            </Button>
            <Button
              startIcon={<InsertEmoticonIcon />}
              sx={{ color: 'green' }}>
              Change Name
            </Button>
            <Button
              onClick={handleMembersRoomChat}
              startIcon={<GroupsIcon />}
              sx={{ color: 'black' }}
            >
              Members
            </Button>
            <Button
              startIcon={<InfoIcon />}
              sx={{ color: 'orange' }}
            >
              Info
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default MenuChatRoom