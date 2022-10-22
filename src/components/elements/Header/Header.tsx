import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'

import { MAIN_PATH } from './../../../routes/routes'
import styles from './Header.module.scss'

import { fetchMobileBrands } from './../../../store/reducers/ActionCreators'
import LinkToBasket from '../../UI/Links/LinkToBasket'
import LinkToFavorite from '../../UI/Links/LinkToFavorite'
import LinkToAuth from '../../UI/Links/LinkToAuth'
import ChooseBrand from '../ChooseBrand/ChooseBrand'

const Header = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const { brands } = useAppSelector(state => state.brands)

  React.useEffect(() => {
    dispatch(fetchMobileBrands())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container className={styles.header}>
      <Row>
        <Col className={styles.logo}>
          <Link to={MAIN_PATH}>Puisho - STORE</Link>
        </Col>
        <ChooseBrand brands={brands} />
        <Col className={styles.navMenu}>
          <LinkToAuth user={user} />
          <LinkToFavorite user={user} />
          <LinkToBasket user={user} />
        </Col>
      </Row>
    </Container>
  )
}

export default Header
