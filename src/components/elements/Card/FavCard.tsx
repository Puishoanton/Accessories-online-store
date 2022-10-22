import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { FAVORITE_PATH } from '../../../routes/routes'
import { removeFavorite } from '../../../store/reducers/favoriteSlice'
import { IProducts } from '../../../types/IProducts'
import styles from './ProductCard.module.scss'

type FavCardProps = {
  item: IProducts
}

const FavCard: FC<FavCardProps> = ({ item }) => {
  const favorite = useAppSelector(state => state.favorite.favorite)
  const dispatch = useAppDispatch()
  return (
    <div className={styles.favCard}>
      <div
        className={styles.removeFav}
        onClick={() => {
          dispatch(removeFavorite(item))
        }}>
        <img src={item.header.selected} alt='Favorite' />
      </div>
      <Link to={FAVORITE_PATH}>
        <div className={styles.mainContent}>
          <h4 className={styles.title}>{item.title}</h4>
          <h5 className={styles.price}>{item.price}</h5>
          <h5 className={styles.discount}>{item.discount}</h5>
        </div>
      </Link>
    </div>
  )
}

export default FavCard
