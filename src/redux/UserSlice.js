import { createSlice } from '@reduxjs/toolkit'

const baseState = {
  _id: '',
  username: '',
  email: '',
  posts: [],
  friends: [],
  room_chats: [],
  bio: '',
  profile_picture: '',
  createdAt: null,
  updatedAt: null
}
const userStorage = JSON.parse(localStorage.getItem('user'))

const initialState = userStorage ? userStorage : baseState
export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    login: (state, action) => {
      const {
        _id, username, email, posts, friends, room_chats, bio, profile_picture, updatedAt, createdAt
      } = action.payload
      state._id = _id
      state.username = username
      state.email = email
      state.posts = posts
      state.friends = friends
      state.room_chats = room_chats
      state.bio = bio
      state.profile_picture = profile_picture
      state.createdAt = createdAt
      state.updatedAt = updatedAt
    },
    logout: (state) => {
      state._id = ''
      state.username = ''
      state.email = ''
      state.posts = []
      state.friends = []
      state.room_chats = []
      state.bio = ''
      state.profile_picture = ''
      state.createdAt = null
      state.updatedAt = null
    }
  }
})
export const { login, logout } = userSlice.actions
export default userSlice.reducer