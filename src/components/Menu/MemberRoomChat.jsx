import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import { OPTION } from '~/utils/MenuOptionChat'
import Avatar from '@mui/material/Avatar'
import { getListUserByListId } from '~/api/userAPI'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField'
const MembersRoomChat = ({ openOption, setOpenOption, setOpenMenuMain, members }) => {
  const profile = useSelector(state => state.userData)
  console.log('members', members)
  const listMembersOrigin = []
  const [keyword, setKeyword] = useState('')
  const [listMembers, setListMembers] = useState([])
  const fetchFriend = async () => {
    const res = await getListUserByListId(profile._id, members)
    setListMembers(res)
    listMembersDefault = res
  }
  useEffect(() => {
    openOption === OPTION.MEMBER && setOpenMenuMain(false)
    fetchFriend()
  }, [openOption])

  const handlerCancel = () => {
    setOpenOption('')
    setOpenMenuMain(true)
  }
  return <>
    <Box
      sx={{
        minWidth: 600,
        maxWidth: '75%',
        minHeight: '100%',
        backgroundColor: 'background.paper',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: '10px',
        padding: 1,
        overflowY: 'auto',
        overflowX: 'none',
      }}
    >
      <Box sx={{ height: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: 2, gap: 1 }}>
        <Button sx={{ width: 'fit-content' }} onClick={handlerCancel} startIcon={<ArrowCircleLeftIcon />}
        >
          <Typography
            variant='h5'
            color='third.main'
            sx={{
              fontWeight: 'bold',
            }}
          >
            MEMBERS ROOM
          </Typography>
        </Button>
        <Divider />
      </Box>
      <Box sx={{
        height: '68vh', display: 'flex', flexDirection: 'column', border:
          '3px solid #f0f2f5', borderRadius: '10px', overflow: 'hidden', gap: 1
        , backgroundColor: '#f0f2f5'
      }}>
        <Typography variant='body1' sx={{ padding: 2, fontWeight: '600', color: 'hashtag.primary' }}>
          List Memebers
        </Typography>
        <Box sx={{ overflowY: 'auto', overflowX: 'none', height: '100%' }}>
          {
            listMembers?.map((item, index) => {
              return (
                <Box key={index}
                  onClick={() => handleChangeMenbers(item)}
                  sx={{
                    marginY: 0.1,
                    backgroundColor: 'background.secondary',
                    border: '2px solid #2b54ea',
                    display: 'flex', gap: 2, padding: 2,
                    alignItems: 'center',
                    cursor: 'pointer',
                    borderTop: '1px solid #f2f4f6',
                    borderBottom: '1px solid #f2f4f6',
                  }}>
                  {/* {
                      true
                        ? <CheckCircleIcon sx={{ color: 'secondary.main' }} />
                        : <RadioButtonUncheckedIcon sx={{ color: 'secondary.main' }} />
                    } */}

                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden' }}>
                    <Avatar src={item.profile_picture} />
                  </Box>

                  <Typography variant='body1' >
                    {item.username}
                  </Typography>
                </Box>
              )
            })
          }
        </Box>
      </Box>
    </Box >
  </>
}
export default MembersRoomChat