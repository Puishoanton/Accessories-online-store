import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
  BASKET_PATH,
  CONTACTS_PATH,
  FAVORITE_PATH,
  MAIN_PATH,
  SERVICE_PATH,
} from '../../../routes/routes'
import { Link } from 'react-router-dom'
import styles from './Footer.module.scss'
import planet from '../../../data/img/icon/planet.svg'
import instagram from '../../../data/img/icon/instagram.svg'
import telegram from '../../../data/img/icon/Telegram.svg'
import whatsapp from '../../../data/img/icon/Whatsapp.svg'

const Footer = () => {
  return (
    <Container className={styles.footer}>
      <Row>
        <Col className={styles.logo}>
          <Link to={MAIN_PATH}>Puisho - STORE</Link>
        </Col>
        <Col className={styles.navigate}>
          <Row>
            <Link to={FAVORITE_PATH}>Favorite</Link>
          </Row>
          <Row>
            <Link to={BASKET_PATH}>Basket</Link>
          </Row>
          <Row>
            <Link to={CONTACTS_PATH}>Contacts</Link>
          </Row>
          <Row>
            <Link to={SERVICE_PATH}>Service</Link>
          </Row>
        </Col>
        <Col className={styles.language}>
          <Row className={styles.languageBox}>
            <img width={24} height={24} src={planet} alt='Language' />
            <h6>Eng</h6>
            <h6>UA</h6>
          </Row>
        </Col>
        <Col className={styles.socials}>
          <Row className={styles.socialsBox}>
            <Col>
              <img src={instagram} alt='instagram' />
            </Col>
            <Col>
              <img src={telegram} alt='telegram' />
            </Col>
            <Col>
              <img src={whatsapp} alt='whatsapp' />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
