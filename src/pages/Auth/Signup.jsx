/* eslint-disable react/no-unescaped-entities */
import image from '~/assets/login_art.jpg'
import IconGoogle from '~/assets/Google'
import IconFacebook from '~/assets/Facebook'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { registerUser } from '~/api/AuthAPI'
import Loading from '~/components/Loading'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigation = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (password !== rePassword) return toast.error('Password not match')
    setLoading(true)
    const res = await registerUser(username, email, password)
    setLoading(false)
    if (res.acknowledged) {
      toast.success('account created successfully')
      navigation('/login')
    }
  }
  return (
    <>
      {loading && <Loading />}
      <Grid container sx={{ height: '100%', width: '100%', padding: '5px', backgroundColor: 'background.secondary', color: 'text.primary' }}>
        <Grid item xs={5} >
          <img src={image} style={{ width: '100%', objectFit: 'scale-down' }} alt='login_art' />
        </Grid>
        <Grid item xs={7} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ maxWidth: ' 25rem' }}>
            <Typography variant='h4' sx={{ marginBottom: 2 }}>
              Create account 👋
            </Typography>
            <Typography variant='span'>
              Today is a new day. It's your day. Your shape it. Sign in to start
              management your project
            </Typography>
            <Box sx={{ width: '24rem', display: 'flex', flexDirection: 'column', gap: 3, marginTop: 5 }}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email' label='Email' type='email' color='secondary' />
              <TextField
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id='username' label='Username' type='text' color='secondary' />
              <TextField value={password} onChange={(e) => setPassword(e.target.value)} id='password' label='Password' type='password' color='secondary' />
              <TextField value={rePassword} onChange={(e) => setRePassword(e.target.value)} id='rePassword' label='Re-Password' type='password' color='secondary' />

              <Button
                onClick={handleSignup}
                sx={{ fontWeight: 'bold', paddingX: 2, paddingY: 2, borderRadius: 3, border: '2px solid #162d3a', backgroundColor: '#162d3a', textAlign: 'center', color: 'background.primary', ':hover': { color: '#162d3a' } }}>
                Create
              </Button>
              <Divider>Or</Divider>
              <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, backgroundColor: '#f3f9fa', borderRadius: '16px', paddingX: 1, paddingY: 2 }}>
                <IconGoogle />
                <Typography variant='span'>Sign in with Google</Typography>
              </Button>
              <Button sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3, backgroundColor: '#f3f9fa', borderRadius: '16px', paddingX: 1, paddingY: 2 }}>
                <IconFacebook />
                <Typography variant='span'>Sign in with Facebook</Typography>
              </Button>
            </Box>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 3 }}>
              <Typography variant='span'> Do have an account ?</Typography>
              <NavLink to='/login' >
                <Typography variant='span' sx={{ color: '#2b54ea', marginLeft: 1 }}>Login</Typography>
              </NavLink>
            </Box>
            <Box sx={{ color: '#959CB6', textAlign: 'center', marginTop: 3 }}>
              © 2023 ALL RIGHTS RESERVED
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
export default Signup