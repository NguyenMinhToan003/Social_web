import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  friendOnlines: [],
  friendRequests: [],
}
export const friendSlice = createSlice({
  name: 'friendOnlinesData',
  initialState,
  reducers: {
    setFriendOnlines: (state, action) => {
      const prev = { ...state.friendOnlines }
      state.friendOnlines = [...prev, action.payload]
    },
    setFriendRequests: (state, action) => {
      state.friendRequests = action.payload
    },
  }
})
export const { setFriendOnlines, setFriendRequests } = friendSlice.actions
export default friendSlice.reducer