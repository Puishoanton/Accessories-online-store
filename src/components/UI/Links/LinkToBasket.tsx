import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { BASKET_PATH } from '../../../routes/routes'
import basketImg from '../../../data/img/icon/basket.svg'
import { userSliceinitialStateType } from '../../../store/reducers/userSlice'
import styles from './Links.module.scss'
import { useAppSelector } from '../../../hooks/redux'

type LinkToBasketProps = {
  user: userSliceinitialStateType | null
}

const LinkToBasket: FC<LinkToBasketProps> = ({ user }) => {
  const { basket } = useAppSelector(state => state.basket)
  const isUserLoggedIn = user?.user !== null
  return (
    <Link to={BASKET_PATH} className={styles.linkBasket}>
      <img src={basketImg} alt='basket' />
      {isUserLoggedIn && basket?.length !== 0 && (
        <div className={styles.basketCount}>{basket?.length}</div>
      )}
    </Link>
  )
}

export default LinkToBasket
