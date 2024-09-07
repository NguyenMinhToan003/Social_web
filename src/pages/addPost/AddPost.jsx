import { Box, TextField, Typography, Button, IconButton } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import TagIcon from '@mui/icons-material/Tag';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useSelector } from "react-redux";
import { createPost } from '~/api/postAPI'
import { toast } from "react-toastify";
import Loading from "~/components/Loading";

const AddPost = () => {
  const profile = useSelector(state => state.userData)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [media, setMedia] = useState([])
  const [hastag, setHastag] = useState([])
  const [loading, setLoading] = useState(false)
  const handleUploadFile = (e) => {
    const files = e.target.files

    if (!files) return

    let newMedia = [...media]
    for (let i = 0; i < files.length; i++) {
      newMedia.push(URL.createObjectURL(files[i]))
    }
    setMedia(newMedia)
  }
  const handlerRemoveMedia = (index) => () => {
    if (index < 0) return
    let newMedia = [...media]
    newMedia = newMedia.filter((item, i) => i !== index)
    setMedia(newMedia)
  }
  const handleChangeHastag = (e) => {
    if (e.target.value === '') return setHastag([])
    let value = e.target.value.split(/[ ,]+/)
    console.log(value)
    setHastag(value)
  }
  const handleSublit = async () => {
    setLoading(true)
    const res = await createPost(profile._id, title, content, media)
    setLoading(false)
    if (res.acknowledged) {
      setTitle('')
      setContent('')
      setMedia([])
      setHastag([])
      toast.success('Post success')
    }
  }
  return <>
    {loading && <Loading />}
    <Box sx={{
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      position: 'relative',
    }}>
      <Typography variant='h6'>Add Post</Typography>
      <TextField
        value={title}
        onChange={(e) => { setTitle(e.target.value) }}
        fullWidth={true}
        sx={{ maxWidth: '80%', margin: '0 auto' }}
        label='Title'
        color='third'
        variant='outlined'
        InputProps={{
          endAdornment: <IconButton onClick={() => { setTitle('') }}><CloseIcon /></IconButton>
        }}
      />
      <TextField
        value={content}
        onChange={(e) => { setContent(e.target.value) }}
        fullWidth={true}
        sx={{ maxWidth: '80%', margin: '0 auto' }}
        label='Content'
        multiline
        rows={5}
        color='secondary'
        variant='outlined'
        InputProps={{
          endAdornment: <IconButton onClick={() => { setContent('') }}><CloseIcon /></IconButton>
        }}
      />
      <TextField
        value={hastag}
        onChange={(e) => { handleChangeHastag(e) }}
        fullWidth={true}
        sx={{ maxWidth: '80%', margin: '0 auto' }}
        label='Hastag'
        color='third'
        variant='outlined'
        InputProps={{
          startAdornment: <TagIcon />
        }}
      />
      <Button
        sx={{ margin: '0 auto' }}
        component='label'
        htmlFor='upload-file'
        variant='contained'
        color='primary'
        startIcon={<CloudUploadIcon />}
      >
        Upload
      </Button>
      <input type="file" id='upload-file' style={{ display: 'none' }} onChange={(e) => { handleUploadFile(e) }} multiple />
      {
        media.length > 0
        &&
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'third.more', padding: 3, borderRadius: 1, width: '80%', margin: '0 auto' }}>
          <Typography variant='body1' color='third.main' sx={{ fontWeight: 'bold' }}>Preview media</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {
              media.map((file, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  <img src={file} alt='media' style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                  <IconButton sx={{ position: 'absolute', top: '-10px', right: '-10px', backgroundColor: 'error.main', height: '25px', width: '25px' }} color='primary'
                    onClick={handlerRemoveMedia(index)}>
                    <CloseIcon sx={{ height: '20px', width: '20px', ":hover": { color: 'third.main' } }} />
                  </IconButton>
                </Box>
              ))
            }
          </Box>
        </Box>
      }
      <Button startIcon={<CheckCircleOutlineIcon />}
        sx={{
          width: '80%',
          margin: '0 auto ',
          color: 'third.main',
          fontWeight: 'bold'
        }}
        onClick={handleSublit}
      >Post now</Button>
    </Box >
  </>
}
export default AddPost