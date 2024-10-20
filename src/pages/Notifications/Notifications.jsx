import Box from '@mui/material/Box'
import Notification from './Notification'
import { getNotifications } from '../../api/notification'
import { mockDataNotification } from '../../api/mockdata'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
const Notifications = () => {
  const profile = useSelector(state => state.userData)
  const [notifications, setNotifications] = useState([])
  const fetchNotifications = async () => {
    const res = await getNotifications(profile._id)
    console.log('notification', res)
    setNotifications(res)
  }
  useEffect(() => {
    fetchNotifications()
  }, [])
  return <>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, padding: '10px' }}>
      {
        notifications?.map((data, index) => {
          return <Notification key={index} notification={data} />
        })
      }
    </Box>
  </>
}
export default Notifications