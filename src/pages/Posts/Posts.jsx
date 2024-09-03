import Post from '~/components/Post/Post'
import { getPosts } from '~/api/postAPI'
import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
const Posts = () => {
  const [listPosts, setListPosts] = useState([])
  const fetchPosts = async () => {
    const response = await getPosts()
    console.log(response)
    setListPosts(response.data)
  }
  useEffect(() => {
    fetchPosts()
  }, [])
  if (!listPosts) return <Box
    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><CircularProgress />Loading...</Box>
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
