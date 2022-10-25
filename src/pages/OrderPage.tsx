import React, { useRef, useState } from 'react'
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap'
import location from '../data/img/icon/location.svg'
import visa from '../data/img/icon/visa.svg'
import map from '../data/img/Rectangle 6.png'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { removeAll } from '../store/reducers/basketSlice'
import { calcDiscount } from '../utils/discount'

const OrderPage = () => {
  const { basket } = useAppSelector(state => state.basket)
  const dispatch = useAppDispatch()
  const [success, setSuccess] = useState(false)
  let totalPrice = useRef(0)
  return (
    <Container style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}>
      {success ? (
        <div style={{ textAlign: 'center', fontSize: '5vw' }}>Thank You.</div>
      ) : (
        <div className='oreder'>
          <div className='delivery'>
            <div className='title'>
              <p>Delivery by courier</p> <p>50$</p>
            </div>
            <div className='map'>
              <img src={map} alt='Map' />
            </div>
            <div className='address'>
              <div className='title'>
                <h4>Address</h4>
                <img src={location} alt='Location' />
              </div>
              <FloatingLabel className='input' controlId='floatingInput' label='Country'>
                <Form.Control placeholder='Country:' type='text' />
              </FloatingLabel>
              <FloatingLabel className='input' controlId='floatingInput' label='City'>
                <Form.Control placeholder='Country:' type='text' />
              </FloatingLabel>
              <FloatingLabel className='input' controlId='floatingInput' label='Street'>
                <Form.Control placeholder='Country:' type='text' />
              </FloatingLabel>
            </div>
          </div>
          <div className='paying'>
            <div className='details'>
              <div className='title'>Your order</div>
              <div className='totlaOrder'>
                <div className='prices'>
                  <div className='product'>
                    {basket?.map(item => {
                      totalPrice.current =
                        totalPrice.current + +calcDiscount(item.price, item.discount)
                      return (
                        <React.Fragment key={item.id}>
                          <div className='item'>
                            <p>{item.title}</p>
                            <p>{calcDiscount(item.price, item.discount)}$</p>
                          </div>
                        </React.Fragment>
                      )
                    })}
                  </div>
                  <div className='reliveryPrice'>
                    <p> Delivery: </p> <p>50$</p>
                  </div>
                  <div className='totalPrice'>
                    <p> Total: </p> <p>{totalPrice.current + 50}$</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='payingMethod'>
              <div className='title'>Payment method</div>
              <div className='method'>
                <p>VISA</p> <img src={visa} alt='VISA' />
              </div>
              <FloatingLabel className='input' controlId='floatingInput' label='Credit card'>
                <Form.Control placeholder='Country:' type='text' />
              </FloatingLabel>
            </div>
            <div className='phoneNum'>
              <div className='title'>Recipient number</div>
              <FloatingLabel className='input' controlId='floatingInput' label='Number'>
                <Form.Control placeholder='Country:' type='text' />
              </FloatingLabel>
            </div>
            <Button
              onClick={() => {
                dispatch(removeAll())
                setSuccess(true)
              }}>
              Buy
            </Button>
          </div>
        </div>
      )}
    </Container>
  )
}

export default OrderPage
