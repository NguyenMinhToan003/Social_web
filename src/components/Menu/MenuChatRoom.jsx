import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Divider from '@mui/material/Divider';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { removeRoomChat } from '~/api/roomChatAPI';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CreateRoomChat from '~/components/CreateRoomChat/CreateRoomChat';
import { useState } from "react";
const MenuChatRoom = ({ roomChatAction, setOpen, open }) => {
  const [openCreate, setOpenCreate] = useState(false)
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
    setOpenCreate(true)
  }
  return (
    <>

      <Box sx={{
        scale: open ? 1 : 0,
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
        <CreateRoomChat open={openCreate} setOpen={setOpenCreate} />
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
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default MenuChatRoom;