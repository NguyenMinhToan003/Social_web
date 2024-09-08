import { createSlice } from "@reduxjs/toolkit";
const initialState = []
export const chatSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    resetChatRoom: (state) => {
      chatSlice = []
    },
    changeChatRoom: (state, action) => {
      if (action.payload === null) {
        return []
      }
      const prev = [...action.payload]
      return prev
    }
  }
})
export const { resetChatRoom, changeChatRoom } = chatSlice.actions
export default chatSlice.reducer