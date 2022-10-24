import React, { useState, useEffect } from 'react'
import { Col } from 'react-bootstrap'
import { IProducts } from '../../../types/IProducts'
import styles from './ProductCard.module.scss'
import { calcDiscount } from './../../../utils/discount'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { addTofavorite, removeFavorite } from '../../../store/reducers/favoriteSlice'
import { AUTH_PATH } from '../../../routes/routes'
import { removeBasket } from '../../../store/reducers/basketSlice'

interface CardProps {
  item: IProducts
  isWireless?: boolean
  isWired?: boolean
  isSilicon?: boolean
  isGlass?: boolean
  isLeather?: boolean
  isBasketItem?: boolean
  setTotal?: (prev: (num: number) => number) => void
  setWithDiscount?: (prev: (num: number) => number) => void
  totalInBasket?: number
  isOrderProduct?: boolean
}

const ProductCard: React.FC<CardProps> = ({
  item,
  isWireless,
  isWired,
  isSilicon,
  isGlass,
  isLeather,
  isBasketItem,
  setTotal,
  setWithDiscount,
  isOrderProduct,
}) => {
  const pathProducts = {
    wired: `/product/headphones/${item.id}`,
    wireless: `/product/wirelessheadphones/${item.id}`,
    silicon: `/product/silicon/${item.id}`,
    glass: `/product/glass/${item.id}`,
    leather: `/product/leather/${item.id}`,
  }

  const dispatch = useAppDispatch()
  const favorite = useAppSelector(state => state.favorite.favorite)
  const user = useAppSelector(state => state.user)
  const nav = useNavigate()
  const [counter, setCounter] = useState(1)
  const price = +item.price.slice(0, -3)
  const withDiscount = calcDiscount(item.price, item.discount)
  useEffect(() => {
    if (setTotal && setWithDiscount) {
      setTotal(prev => prev + price)
      setWithDiscount(prev => prev + withDiscount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const favIcon =
    user?.user !== null && item === favorite.find(el => el.id === item.id) ? (
      <img
        className={styles.fav}
        src={item.header.selected}
        alt='fav'
        onClick={() => dispatch(removeFavorite(item))}
      />
    ) : (
      <img
        className={styles.fav}
        src={item.header.notSelected}
        alt='notFav'
        onClick={() => {
          user?.user !== null ? dispatch(addTofavorite(item)) : nav(AUTH_PATH)
        }}
      />
    )
  return (
    <>
      {isOrderProduct ? (
        <>
          
        </>
      ) : (
        <Col className={styles.prodCard}>
          {favIcon}

          <Link
            to={
              (isWireless && pathProducts.wireless) ||
              (isWired && pathProducts.wired) ||
              (isSilicon && pathProducts.silicon) ||
              (isGlass && pathProducts.glass) ||
              (isLeather && pathProducts.leather) ||
              '/'
            }>
            <div className={styles.prodImg}>
              <img src={item.galleryImgs?.at(item.id) || item.img} alt='Product' />
            </div>
            <div className={styles.prodInfo}>
              <div className={styles.titlePrice}>
                <h2>{item.title}</h2>
                <div className={styles.dicount}>
                  <div className={styles.beforeDisc}>
                    <p style={item.discount ? { textDecoration: 'line-through' } : {}}>
                      {item.price}
                    </p>{' '}
                    <p>{item.discount}</p>
                  </div>
                  {item.discount && (
                    <div className={styles.afterDisc}>
                      {calcDiscount(item.price, item.discount)} USD
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.rating}>
                <img width={20} height={20} src={item.rating.img} alt='rating' />
                <p>{item.rating.num}</p>
              </div>
            </div>
          </Link>
        </Col>
      )}
      {isBasketItem && (
        <div className='basketManipulate'>
          <p>{counter}</p>
          <div className='counter'>
            <button
              disabled={counter < 2}
              className='basketBtn btn'
              onClick={() => {
                if (setTotal && setWithDiscount) {
                  setTotal(prev => prev - price)
                  setWithDiscount(prev => prev - withDiscount)
                }
                setCounter(prev => prev - 1)
              }}>
              -
            </button>
            <button
              disabled={counter > 9}
              className='basketBtn btn'
              onClick={() => {
                if (setTotal && setWithDiscount) {
                  setTotal(prev => prev + price)
                  setWithDiscount(prev => prev + withDiscount)
                }
                setCounter(prev => prev + 1)
              }}>
              +
            </button>
          </div>
          <div
            className='remove btn'
            onClick={() => {
              if (setTotal && setWithDiscount) {
                setTotal(prev => prev - price * counter)
                setWithDiscount(prev => prev - withDiscount * counter)
              }
              dispatch(removeBasket(item))
            }}>
            Remove
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
