import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
const LoadingArea = () => {
  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100vh' }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
      <CircularProgress color='inherit' />
      <Typography variant='body2' color='text.primary'>Loading...</Typography>
    </Box>
  </div >
}
export default LoadingArea