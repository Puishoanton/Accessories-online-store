import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import styles from '../components/elements/Product/Product.module.scss'
import Loader from '../components/UI/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useOutside } from '../hooks/useOutside'
import { ORDER_PATH } from '../routes/routes'
import { productAPI, WIRELESSHEADPHONESURL } from '../services/productsService'
import { addToBasket, removeBasket } from '../store/reducers/basketSlice'
import { IProducts } from '../types/IProducts'
import { calcDiscount } from '../utils/discount'

const ProductWirelessHeadphonesPage = () => {
  const { openRef, contentRef, isShow, setIsShow } = useOutside(false)
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { data: d } = productAPI.useGetWirelessQuery()
  const arrayIndex = d?.wirelessHeadPhones.findIndex((e: IProducts) => e.id === parseInt(id || ''))
  const { data, isLoading, isError } = productAPI.useGetHeadphonesByIdQuery({
    product: WIRELESSHEADPHONESURL,
    typeOfProduct: 'wirelessHeadPhones',
    id: id ? arrayIndex : -1,
  })
  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 1000)
  }, [])

  const { basket } = useAppSelector(state => state.basket)
  const isItemInsideBasket = data === basket?.find(el => el.id === (data === null ? -1 : data?.id))

  // make universal component for wired and wireless headphones
  return (
    <Container style={{ flex: '1 1 auto' }}>
      {isError &&
        'Oops, some error happened. Try to check the Internet connection and refresh page'}
      {isLoading ? (
        <Loader />
      ) : (
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
              <Button
                onClick={() => {
                  dispatch(addToBasket(data || null))
                  nav(ORDER_PATH)
                }}>
                BUY
              </Button>
              <Button
                variant={isItemInsideBasket ? 'danger' : 'primary'}
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
      )}
    </Container>
  )
}

export default ProductWirelessHeadphonesPage
