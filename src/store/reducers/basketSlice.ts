import { IProducts } from './../../types/IProducts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  basket: [] as IProducts[] | null | undefined,
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<IProducts | any>) => {
      state.basket?.push(action.payload)
    },
    removeBasket: (state, action: PayloadAction<IProducts | undefined>) => {
      const id = action.payload?.id
      state.basket = state.basket?.filter(card => card.id !== id)
    },
    removeAll: state => {
      state.basket = []
    },
  },
})
export default basketSlice.reducer
export const { addToBasket, removeBasket, removeAll } = basketSlice.actions
