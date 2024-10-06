import Container from '@mui/material/Container'
import AppRouter from './routers/AppRouter'
import { socket } from './Socket'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function App() {
  const profile = useSelector(state => state.userData)
  useEffect(() => {
    socket.emit('online', profile._id)
    socket.emit('room_signature', profile._id)
    return () => {
      socket.emit('offline', profile._id)
    }
  }, [profile._id])
  useEffect(() => {
    socket.on('create-room-chat', (roomchat) => roomchat && toast.success(`invite room chat ${roomchat}`))

  }, [socket])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh', backgroundColor: '#f0f2f5' }}>
        <AppRouter />
      </Container>
    </>
  )
}

export default App
