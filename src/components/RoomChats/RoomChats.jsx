import Box from '@mui/material/Box'
import RoomChat from './RoomChat'
import RoomChatFriend from './RoomChatFriend'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { getFriends } from '~/api/userAPI'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getRoomChats } from '~/api/roomChatAPI'
import { findUsers } from '~/api/userAPI'
import { Chip } from '@mui/material'
import MenuChatRoom from '~/components/Menu/MenuChatRoom'

const RoomChats = ({ setRoom }) => {
  const [open, setOpen] = useState(false)
  const [roomChatAction, setRoomChatAction] = useState({})
  const profile = useSelector(state => state.userData)
  const [listSearch, setListSearch] = useState([])
  const [keyword, setKeyword] = useState('')
  const [chipLabel, setChipLabel] = useState('')
  const [listRooms, setListRooms] = useState([])
  const [friends, setFriends] = useState([])


  const fetchRooms = async () => {
    const resRoom = await getRoomChats(profile._id)
    setListRooms(resRoom)
    const resFriend = await getFriends(profile._id)
    const friendsNonRoomChat = resFriend.filter(friend => {
      return !resRoom.some(room => room.type === 'private' && room.members.includes(friend._id))
    })
    setFriends(friendsNonRoomChat)
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handlerFindUser = async (e) => {
    if (e.keyCode === 13 && keyword) {
      const res = await findUsers(e.target.value)
      if (res.length === 0)
        setChipLabel('No user found')
      else
        setChipLabel('Search Results')
      setListSearch(res)
    }
  }
  const handlerCancelSearch = () => {
    setChipLabel('')
    setKeyword('')
    setListSearch([])
  }

  return (
    <>
      {
        open &&
        <MenuChatRoom roomChatAction={roomChatAction} setOpen={setOpen} />
      }
      <Box sx={{ position: 'relative', width: '100%', padding: 1 }}>
        <input
          value={keyword}
          onChange={(e) => { setKeyword(e.target.value) }}
          onKeyDown={handlerFindUser}
          placeholder="Search"
          style={{
            width: '100%',
            padding: '11px 20px',
            fontSize: '17px',
            border: '1px solid #6b6d71',
            borderRadius: '21px',
          }}
        />
        {keyword && (
          <IconButton
            onClick={() => handlerCancelSearch()}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'background.primary',
            }}
          >
            <CloseIcon sx={{ fontSize: '20px', fontWeight: '900', color: 'error.main' }} />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden', padding: '10px' }}>
        {
          chipLabel && (
            <Chip
              label={chipLabel}
              sx={{ width: 'fit-content', marginBottom: '10px' }}
            />
          )
        }
        {listSearch.length > 0 ? (
          listSearch.map((data, index) => (
            <RoomChatFriend key={index} friend={data} setRoom={setRoom} />
          ))
        ) : (
          <>
            {friends?.map((data, index) => (
              <RoomChatFriend key={index} friend={data} setRoom={setRoom} />
            ))}
            {listRooms?.map((data, index) => (
              <RoomChat key={index} roomChat={data} setOpen={setOpen} setRoomChatAction={setRoomChatAction} />
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default RoomChats
