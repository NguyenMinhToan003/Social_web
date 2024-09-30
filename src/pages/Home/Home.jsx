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
            width: '100%',
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
            display: { xs: 'none', lg: 'block' }
          }}>
        </Box>
      </Box>
    </>
  )
}

export default Home
