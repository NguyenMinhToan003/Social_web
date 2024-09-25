import CameraAltIcon from '@mui/icons-material/CameraAlt'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Divider from '@mui/material/Divider'
import Avartar from '@mui/material/Avatar'
import { useState } from 'react'
const CreateRoomChat = ({ open, setOpen }) => {
  const [file, setFile] = useState('')
  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    const img = URL.createObjectURL(file)
    console.log(img)
    setFile(img)
  }


  return <>
    <Box sx={{
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
      padding: 1
    }}>
      <Box sx={{
        minWidth: '70%',
        minHeight: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        padding: '10px',
        padding: 1
      }}>
        <Button
          onClick={() => setOpen(false)}
          startIcon={<ArrowCircleLeftIcon />}
        >
          <Typography
            variant='h5'
            color='third.main'
            sx={{
              fontWeight: 'bold'
            }}>
            Create Room Chat
          </Typography>
        </Button>
        <Divider />
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', padding: 2 }}>
          <input
            onChange={handleChangeFile}
            type='file' id='profileRoomChatCreate' style={{ display: 'none' }} />
          <label htmlFor='profileRoomChatCreate'>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: 65,
              height: 65,
              borderRadius: '50%',
              backgroundColor: 'background.paper',
              border: '4px solid #f2f4f6',
              padding: 2
            }}>
              {
                file === '' ?
                  <CameraAltIcon sx={{ color: '#7589a3', width: '100%', height: '100%' }} />
                  :
                  <Avartar src={file} sx={{ width: '100%', height: '100%' }} />
              }
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
        <Divider />
      </Box>
    </Box>
  </>
}
export default CreateRoomChat