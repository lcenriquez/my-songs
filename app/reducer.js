import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  songList: []
}

export const favoriteSlice = createSlice({
  name: 'favoriteSongs',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addFavoriteSong: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if (state.songList.findIndex(song => +song.id === +action.payload.id) < 0) {
        state.songList = [...state.songList, action.payload]
      }
    },
    removeFavoriteSong: (state, action) => {
      state.songList = state.songList.filter(song => song.id !== action.payload)
    }
  }
})

export const { addFavoriteSong, removeFavoriteSong } = favoriteSlice.actions

export default favoriteSlice.reducer