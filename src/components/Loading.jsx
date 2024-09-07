import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
const Loading = () => {
  return <>
    <Box sx={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '100vw', backgroundColor: '#00000090', zIndex: '100000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress color='error' />
      <Typography variant='h6' sx={{ color: 'white' }}>Loading...</Typography>
    </Box>
  </>
}
export default Loading