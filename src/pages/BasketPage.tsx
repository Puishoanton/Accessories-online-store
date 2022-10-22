import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useAppSelector } from '../hooks/redux'

import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/elements/Card/ProductCard'
import img from '../data/img/basket.png'

const BasketPage: React.FC = () => {
  const nav = useNavigate()
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
  return (
    <Container style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}>
      <div className='fullBasket'>
        {basket?.length ? (
          <div className='basketList'>
            {basket?.map(card => (
              <ProductCard key={card.id} item={card} isBasketItem={true} />
            ))}
          </div>
        ) : (
          emptyJSX
        )}
        {basket?.length === undefined ||
          (basket?.length > 0 && (
            <div className='basketOrder'>
              <div className='total'>
                <h4>Total: </h4> <h4>1000$</h4>
              </div>
              <div className='buy btn'>Buy</div>
            </div>
          ))}
      </div>
    </Container>
  )
}

export default BasketPage
