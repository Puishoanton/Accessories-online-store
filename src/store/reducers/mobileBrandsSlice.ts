import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchMobileBrands } from './ActionCreators'
import { IMobileBrand } from './../../types/IMobileBrand'

const initialState = {
  brands: null as IMobileBrand[] | null,
  isLoading: false as boolean,
  error: '' as string,
}

export const mobileBrandsSlice = createSlice({
  name: 'MobileBrands',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMobileBrands.pending.type]: state => {
      state.isLoading = true
    },
    [fetchMobileBrands.fulfilled.type]: (state, action: PayloadAction<IMobileBrand[]>) => {
      state.isLoading = false
      state.error = ''
      state.brands = action.payload
    },
    [fetchMobileBrands.pending.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})



export default mobileBrandsSlice.reducer
