import Box from '@mui/material/Box'
import BtnHome from './Menu/BtnHome'
import BtnSearch from './Menu/BtnSearch'
import BtnNotification from './Menu/BtnNotification'
import BtnChat from './Menu/BtnChat'
import BtnBookmark from './Menu/BtnBookmark'
import BtnProfile from './Menu/BtnProfile'
import Divider from '@mui/material/Divider'
import { NavLink } from 'react-router-dom'
import BtnAddPost from './Menu/BtnAddPost'
import BtnSwitchAccount from './Menu/BtnSwitchAccount'
const Nav = () => {
  return (
    <>
      <Box
        sx={{
          width: (theme) => theme.socialMedia.widthLeft,
          position: 'fixed',
          left: '0',
          top: '0',
          bottom: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.2rem',
          color: 'text.secondary',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: '#f0f2f5'
        }}
      >
        <NavLink to="/" className='navLink'>
          <BtnHome />
        </NavLink>

        <NavLink to="/search" className='navLink'>
          <BtnSearch />
        </NavLink>

        <NavLink to="/notifications" className='navLink'>
          <BtnNotification />
        </NavLink>

        <NavLink to="/roomchats" className='navLink'>
          <BtnChat />
        </NavLink>

        <NavLink to="/bookmark" className='navLink'>
          <BtnBookmark />
        </NavLink>

        <NavLink to="/profile" className='navLink'>
          <BtnProfile />
        </NavLink>
        <BtnAddPost />
      </Box>


    </>
  )
}

export default Nav
