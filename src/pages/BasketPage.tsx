import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useAppSelector } from '../hooks/redux'

import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/elements/Card/ProductCard'
import img from '../data/img/basket.png'
import { ORDER_PATH } from '../routes/routes'

const BasketPage: React.FC = () => {
  const nav = useNavigate()
  const [total, setTotal] = useState(0)
  const [withDiscount, setWithDiscount] = useState(0)
  const { basket } = useAppSelector(state => state.basket)
  const emptyJSX = (
    <Col className='basket'>
      <Row className='img'>
        <img src={img} alt='Basket' />
      </Row>
      <Row className='info'>
        <h4>The basket is empty</h4>
        <p>But it's never too late to fix it :)</p>
      </Row>
      <Row className='button'>
        <Button onClick={() => nav('/')}>To the product catalog</Button>
      </Row>
    </Col>
  )
  useEffect(() => {}, [total])
  return (
    <Container style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}>
      <div className='fullBasket'>
        {basket?.length ? (
          <div className='basketList'>
            {basket?.map(card => (
              <ProductCard
                key={card.id}
                item={card}
                isBasketItem={true}
                setWithDiscount={setWithDiscount}
                setTotal={setTotal}
                totalInBasket={basket.length}
              />
            ))}
          </div>
        ) : (
          emptyJSX
        )}
        {basket?.length === undefined ||
          (basket?.length > 0 && (
            <div className='basketOrder'>
              <div className='total'>
                <div>
                  <h4>Total: </h4> <h4>{total}$</h4>
                </div>
                <div>
                  <h4>With discount: </h4> <h4>{withDiscount}$</h4>
                </div>
              </div>
              <button className='buy btn' onClick={() => nav(ORDER_PATH)}>
                Buy
              </button>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default BasketPage
