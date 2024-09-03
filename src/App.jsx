import Container from '@mui/material/Container'
import AppRouter from './routers/AppRouter'
import { socket } from './Socket'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
function App() {
  const profile = useSelector(state => state.userData)
  useEffect(() => {
    socket.emit('online', profile._id)
    socket.emit('room_signature', profile._id)
    return () => {
      socket.emit('offline', profile._id)
    }
  }, [profile._id])
  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppRouter />
      </Container>
    </>
  )
}

export default App
