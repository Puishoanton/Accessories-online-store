import * as EmailValidator from 'email-validator'
import React, { MouseEvent, useState } from 'react'
import { Alert, Col, FloatingLabel } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { auth, signInWithEmailAndPassword } from '../../../Firebase'
import { useAppDispatch } from '../../../hooks/redux'
import { isLoggedStatus } from '../../../store/reducers/favoriteSlice'
import { login } from '../../../store/reducers/userSlice'
import styles from './Login.module.scss'

interface LoginProps {
  setHasAccount: (value: boolean) => void
}

const Login: React.FC<LoginProps> = ({ setHasAccount }) => {
  const btnClass = ['btn', 'btn-success', 'btn-block', 'btn-lg', 'text-body', styles.btnSubmit]
  const [alert, setAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [password, setPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const dispatch = useAppDispatch()
  const loginToApp = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        )
      })
      .catch(err => {
        if (err.code === 'auth/wrong-password') {
          setAlertMessage('Invalid password')
        } else if (err.code === 'auth/network-request-failed') {
          setAlertMessage('Not Internet connection')
        } else if (err.code === 'auth/user-not-found') {
          setAlertMessage('User not found')
        } else if (err.code === 'auth/invalid-email') {
          setAlertMessage('Invalid email')
        }
        setAlert(true)
        setTimeout(() => {
          setAlert(false)
        }, 3000)
      })
  }
  React.useEffect(() => {
    setIsEmailValid(EmailValidator.validate(email))
  }, [email])
  return (
    <Col
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      
      className={styles.formBox}>
      {alert && (
        <Alert
          className={styles.alert}
          variant='danger'
          onClose={() => setAlert(false)}
          dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{alertMessage}</p>
        </Alert>
      )}
      <h1>Login</h1>
      <Form>
        <FloatingLabel
          controlId='floatingInput'
          className='mb-3'
          label={emailValidation ? 'Invalid Email' : 'Email address'}>
          <Form.Control
            value={email}
            onChange={e => setEmail(e.target.value)}
            type='email'
            placeholder='Enter email'
            onFocus={React.useCallback(() => setEmailValidation(true), [])}
          />
        </FloatingLabel>
        <FloatingLabel label='Password' className='mb-3' controlId='floatingPassword'>
          <Form.Control
            value={password}
            onChange={e => {
              setPassword(e.target.value)
              if (e.target.value.length > 8) setIsPasswordValid(true)
            }}
            type='password'
            placeholder='Password'
          />
        </FloatingLabel>
        <Col className='d-flex justify-content-between align-items-center'>
          <div onClick={() => setHasAccount(false)} className={styles.account}>
            Still do not have an account?
          </div>

          <Button
            disabled={!isEmailValid || !isPasswordValid}
            className={btnClass.join(' ')}
            type='submit'
            onClick={e => {
              dispatch(isLoggedStatus(true))
              loginToApp(e)
            }}>
            Submit
          </Button>
        </Col>
      </Form>
    </Col>
  )
}

export default Login
