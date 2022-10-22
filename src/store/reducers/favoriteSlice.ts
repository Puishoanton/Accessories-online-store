import { IProducts } from './../../types/IProducts'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type IState = {
  favorite: IProducts[]
  isLoggedin: boolean
}

const initialState: IState = {
  favorite: [],
  isLoggedin: false,
}

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addTofavorite: (state, action: PayloadAction<IProducts>) => {
      state.favorite.push(action.payload)
    },
    removeFavorite: (state, action: PayloadAction<IProducts>) => {
      const id = action.payload.id
      state.favorite = state.favorite.filter(card => card.id !== id)
    },
    isLoggedStatus: (state, action: PayloadAction<any>) => {
      state.isLoggedin = action.payload
    },
  },
})

export const { addTofavorite, removeFavorite, isLoggedStatus } = favoriteSlice.actions
export default favoriteSlice.reducer
