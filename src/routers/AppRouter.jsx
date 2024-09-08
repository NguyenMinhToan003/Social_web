import { Routes, Route } from 'react-router-dom'
import Home from '~/pages/Home/Home'
import Profile from '~/pages/Profile/Profile'
import Posts from '~/pages/Posts/Posts'
import ErrorRouter from './ErrorRouter'
import Notifications from '../pages/Notifications/Notifications'
import Follwer from '../pages/Follwer/Follwer'
import Login from '~/pages/Auth/Login'
import Signup from '~/pages/Auth/Signup'
import Chats from '../pages/chats/Roomchats'
import AddPost from '../pages/addPost/AddPost'
import Recovery from '../components/Recovery/Recovery'
const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<Posts />} />
        <Route path='profile' element={<Profile />} >
          <Route path='posts' element={<Posts />} />
          <Route path='notification' element={<Notifications />} />
          <Route path='follower' element={<Follwer />} />
        </Route>
        <Route path='roomchats' element={<Recovery />} />
        <Route path='chats/:id' element={<Chats />} />
        <Route path='bookmark' element={<Posts />} />
        <Route path='notifications' element={<Notifications />} />
        <Route path='add-post' element={<AddPost />} />
      </Route>
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='*' element={<ErrorRouter />} />
    </Routes>
  )
}
export default AppRouter