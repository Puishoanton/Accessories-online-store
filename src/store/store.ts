import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import favoriteReducer from './reducers/favoriteSlice'
import basketReducer from './reducers/basketSlice'
import mobileBrandsReducer from './reducers/mobileBrandsSlice'
import { productAPI } from './../services/productsService'

const rootReducer = combineReducers({
  user: userReducer,
  brands: mobileBrandsReducer,
  basket: basketReducer,
  favorite: favoriteReducer,
  [productAPI.reducerPath]: productAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(productAPI.middleware),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
