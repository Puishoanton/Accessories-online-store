import React, { FC } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LEATHERCASES_PATH, SILICONCASES_PATH, GLASSCASES_PATH } from '../../../routes/routes'
import { CasesType } from '../../../types/IProducts'
import styles from './ProductCard.module.scss'

type CasesProps = {
  item: CasesType
}

const CasesCard: FC<CasesProps> = ({ item }) => {
  return (
    <Col className={[styles.prodCard, styles.cases].join(' ')}>
      <Link
        to={
          (item.id === 1 && SILICONCASES_PATH) ||
          (item.id === 2 && GLASSCASES_PATH) ||
          (item.id === 3 && LEATHERCASES_PATH) ||
          '/'
        }>
        <img src={item.img} alt='Case' />
        <h5>{item.type}</h5>
      </Link>
    </Col>
  )
}

export default CasesCard
