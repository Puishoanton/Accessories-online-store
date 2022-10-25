import React from 'react'
import { Col, Container } from 'react-bootstrap'
import map from '../data/img/Rectangle 6.png'

const ContactsPage = () => {
  return (
    <Container style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}>
      <Col className='contacts'>
        <div className='title'>Our office</div>
        <div className='map'>
          <img src={map} alt='Map' />
        </div>
        <div className='location'>
          <p>Street, 1, City, Country</p>
          <p>42rd floor, office 42</p>
        </div>
        <div className='phone'>+1(00)-200-300-400</div>
      </Col>
    </Container>
  )
}

export default ContactsPage
