import Post from '~/components/Post/Post'
import { getPosts } from '~/api/postAPI'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
const Posts = () => {
  const [listPosts, setListPosts] = useState(null)
  const fetchPosts = async () => {
    const response = await getPosts()
    console.log(response)
    setListPosts(response.data)
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  if (listPosts === null) return <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      gap: 3,
      backgroundColor: '#00000010'
    }}>
    <CircularProgress color='secondary' />
    <Typography variant='body2' color='text.primary'>Loading...</Typography>
  </Box>
  return <>
    <Box >
      {
        listPosts?.map((post, index) => (
          <Post key={index} post={post} />
        ))
      }
    </Box>
  </>
}

export default Posts
