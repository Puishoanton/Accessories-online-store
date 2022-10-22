import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from '../components/elements/Header/Header'
import {
  BASKET_PATH,
  ORDER_PATH,
  AUTH_PATH,
  FAVORITE_PATH,
  privateRoute,
  publicRoute,
} from './routes'
import Footer from './../components/elements/Footer/Footer'
import { useAppSelector } from '../hooks/redux'

const AppRouter = () => {
  const user = useAppSelector(state => state.user)
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {user.user === null
          ? publicRoute.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))
          : privateRoute.map(route => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}

        <Route path='*' element={<Navigate to='/' replace />} />  
        <Route path={BASKET_PATH} element={<Navigate to={AUTH_PATH} replace />} />
        <Route path={FAVORITE_PATH} element={<Navigate to={AUTH_PATH} replace />} />
        <Route path={ORDER_PATH} element={<Navigate to={AUTH_PATH} replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default AppRouter
