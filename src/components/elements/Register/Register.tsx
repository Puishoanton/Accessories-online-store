import React, { useState } from 'react'
import styles from './Register.module.scss'
import * as EmailValidator from 'email-validator'
import PasswordChecklist from 'react-password-checklist'
import { auth, createUserWithEmailAndPassword } from '../../../Firebase'
import { login } from '../../../store/reducers/userSlice'
import { useAppDispatch } from '../../../hooks/redux'
import Form from 'react-bootstrap/Form'
import { Button, Col, FloatingLabel } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { isLoggedStatus } from '../../../store/reducers/favoriteSlice'

interface RegisterProps {
  setHasAccount: (value: boolean) => void
}

const Register: React.FC<RegisterProps> = ({ setHasAccount }) => {
  const dispatch = useAppDispatch()
  const btnClass = ['btn', 'btn-success', 'btn-block', 'btn-lg', 'text-body', styles.btnSubmit]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)
  const [passwodrValidation, setPasswodrValidation] = useState(false)

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userAuth => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
          })
        )
        return <Navigate to='/' />
      })
      .catch(err => {
        alert(err)
      })
  }

  const cb = React.useCallback((isValid: boolean) => setIsPasswordValid(isValid), [])
  React.useEffect(() => {
    setIsEmailValid(EmailValidator.validate(email))
  }, [email])

  return (
    <Col
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      className={styles.formBox}>
      <h1>Register</h1>
      {/* <Form> */}
      <FloatingLabel
        controlId='floatingInput'
        className='mb-3'
        label={emailValidation ? 'Email address' : 'Invalid Email'}>
        <Form.Control
          className={isEmailValid ? '' : styles.error}
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email'
          type='email'
          onFocus={React.useCallback(() => setEmailValidation(true), [])}
        />
      </FloatingLabel>
      <FloatingLabel label='Password' className='mb-3' controlId='floatingPassword'>
        <Form.Control
          className={isPasswordValid ? '' : styles.error}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password'
          type='password'
          onFocus={() => setPasswodrValidation(true)}
        />
      </FloatingLabel>
      {passwodrValidation && (
        <PasswordChecklist
          rules={['minLength', 'specialChar', 'capital']}
          minLength={8}
          value={password}
          onChange={cb}
        />
      )}
      <Col className='d-flex justify-content-between align-items-center'>
        <div onClick={() => setHasAccount(true)} className={styles.account}>
          Already have an account?
        </div>
        <Button
          className={btnClass.join(' ')}
          onClick={() => {
            dispatch(isLoggedStatus(true))
            register()
          }}
          disabled={!isEmailValid || !isPasswordValid}
          type='submit'>
          Submit
        </Button>
      </Col>
      {/* </Form> */}
    </Col>
  )
}

export default Register
export function loginToApp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
  throw new Error('Function not implemented.')
}
