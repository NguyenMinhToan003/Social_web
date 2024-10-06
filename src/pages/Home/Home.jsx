import Box from '@mui/material/Box'
import Nav from '~/components/Nav/Nav'
import LeftHome from '~/pages/LeftHome/LeftHome'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <>
      <Nav />
      <LeftHome />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            minWidth: theme => theme.socialMedia.widthLeft,
            maxWidth: theme => theme.socialMedia.widthLeft
          }}
        >
        </Box>
        <Box
          sx={{
            borderRadius: '1rem',
            backgroundColor: 'background.secondary',
            width: '100%',
            height: '100vh',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <Outlet />
        </Box>
        <Box
          sx={{
            minWidth: theme => theme.socialMedia.widthRight,
            maxWidth: theme => theme.socialMedia.widthRight,
            display: { sm: 'none', lg: 'block' }
          }}>
        </Box>
      </Box>
    </>
  )
}

export default Home
