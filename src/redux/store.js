import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './UserSlice'
import { chatSlice } from './ChatSlice'
export default configureStore({
  reducer: {
    userData: userSlice.reducer,
    chatData: chatSlice.reducer,
  }
})