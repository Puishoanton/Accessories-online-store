import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { HEADPHONESARRAYNAME, HEADPHONESURL, productAPI } from '../services/productsService'
import styles from '../components/elements/Product/Product.module.scss'
import { calcDiscount } from '../utils/discount'
import { useOutside } from '../hooks/useOutside'
import { ORDER_PATH } from '../routes/routes'
import { IProducts } from '../types/IProducts'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { addToBasket, removeBasket } from '../store/reducers/basketSlice'

const ProductHeadphonesPage = () => {
  const { openRef, contentRef, isShow, setIsShow } = useOutside(false)
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const { id } = useParams()
  const { data: d } = productAPI.useGetProductsQuery(HEADPHONESURL)
  const arrayIndex = d.headPhones.findIndex((e: IProducts) => e.id === parseInt(id || ''))
  const { data } = productAPI.useGetHeadphonesByIdQuery({
    product: HEADPHONESURL,
    typeOfProduct: HEADPHONESARRAYNAME,
    id: id ? arrayIndex : -1,
  })
  const { basket } = useAppSelector(state => state.basket)
  const isItemInsideBasket = data === basket?.find(el => el.id === (data === null ? -1 : data?.id))
  return (
    <Container style={{ flex: '1 1 auto' }}>
      <article className={styles.product}>
        <section className={styles.mainContent}>
          <div className={styles.image}>
            <img src={data?.img} alt='Product' />
          </div>
          <div className={styles.productInfo}>
            <section className={styles.content}>
              <h4 className={styles.title}>{data?.title} </h4>
              <h4>Lorem ipsum dolor sit amet.</h4>
              <h4>Amet dolor ipsum sit .</h4>
              <h4>Dolor sit amet Lorem ipsum.</h4>
              <div className={styles.titlePrice}>
                <div className={styles.beforeDisc}>
                  <h4 style={data?.discount ? { textDecoration: 'line-through' } : {}}>
                    {data?.price}
                  </h4>
                  <h4 style={{ marginLeft: 20 }}>{data?.discount}</h4>
                </div>
                {data?.discount && (
                  <div className={styles.afterDisc}>
                    {calcDiscount(data?.price, data?.discount)} USD
                  </div>
                )}
              </div>
              <div className={styles.rating}>
                <img width={30} height={30} src={data?.rating.img} alt='rating' />
                <h5>{data?.rating.num}</h5>
              </div>
            </section>
          </div>
        </section>
        <div className={styles.descrAndBuy}>
          <div className={styles.description}>
            <h4
              ref={openRef}
              onClick={() => {
                setIsShow(!isShow)
              }}>
              Description
            </h4>
            <ul
              ref={contentRef}
              className={isShow ? [styles.list, styles.active].join(' ') : styles.list}>
              {data?.decription.map(text => (
                <li key={Date.now() + Math.random()} className={styles.textDescription}>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.buttonsBox}>
            <Button onClick={() => nav(ORDER_PATH)}>BUY</Button>
            <Button
              variant={isItemInsideBasket ? 'danger': 'primary'}
              onClick={() => {
                isItemInsideBasket
                  ? dispatch(removeBasket(data || undefined))
                  : dispatch(addToBasket(data || null))
              }}>
              {isItemInsideBasket ? 'REMOVE FROM BASKET' : 'ADD TO BASKET'}
            </Button>
          </div>
        </div>
      </article>
    </Container>
  )
}

export default ProductHeadphonesPage
