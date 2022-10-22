import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IMobileBrand } from './../../types/IMobileBrand'

export const fetchMobileBrands = createAsyncThunk('product/MobileBrands', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IMobileBrand[]>(
      'https://puisho-store-default-rtdb.europe-west1.firebasedatabase.app/mobileBrand.json'
    )
    return response.data
  } catch (error) {
    thunkAPI.rejectWithValue('Error during fetching mobile brandsf')
  }
})
