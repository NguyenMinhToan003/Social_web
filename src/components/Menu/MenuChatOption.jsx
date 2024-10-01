import Box from '@mui/material/Box'
import { OPTION } from '~/utils/MenuOptionChat'
import CreateRoomChat from './CreateRoomChat'
import MembersRoomChat from './MemberRoomChat'
const MenuChatOption = ({ openOption, setOpenOption, setOpenMenuMain, members }) => {

  return <>

    <Box sx={{
      scale: openOption !== '' ? 1 : 0,
      backgroundColor: '#00000650',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '100vh',
      zIndex: 10001,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box
        sx={{
          transition: 'all 0.25s ease-out',
          scale: openOption !== '' ? 1 : 0,
          opacity: openOption !== '' ? 1 : 0,
          visibility: openOption !== '' ? 'visible' : 'hidden',
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        {
          openOption === OPTION.CREATE &&
          <CreateRoomChat setOpenOption={setOpenOption} setOpenMenuMain={setOpenMenuMain} openOption={openOption} />
        }
        {
          openOption === OPTION.MEMBER &&
          <MembersRoomChat setOpenOption={setOpenOption} setOpenMenuMain={setOpenMenuMain} openOption={openOption} members={members} />
        }
      </Box>
    </Box >
  </>
}
export default MenuChatOption