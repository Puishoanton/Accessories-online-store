import React, { useEffect } from 'react'
import { login, logout } from '../store/reducers/userSlice'
import { auth, onAuthStateChanged } from '../Firebase'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import Login from '../components/elements/Login/Login'
import Register from '../components/elements/Register/Register'
import { Container } from 'react-bootstrap'

const AuthPage = () => {
  const [hasAccount, setHasAccount] = React.useState<boolean>(true)
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(auth, userAuth => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth?.email,
            uid: userAuth?.uid,
          })
        )
      } else {
        dispatch(logout())
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {user.user === null && (
        <Container
          style={{ flex: '1 1 auto', marginTop: 100 }}
          className='d-flex flex-column justify-content-center align-items-center'>
          {hasAccount ? (
            <Login setHasAccount={setHasAccount} />
          ) : (
            <Register setHasAccount={setHasAccount} />
          )}
        </Container>
      )}
    </>
  )
}

export default AuthPage
