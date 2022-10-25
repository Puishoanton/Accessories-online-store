import React, { FC, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { usePopup } from '../../../hooks/usePopup'
import Popup from '../../UI/Popup/Popup'
import styles from './ChooseBrand.module.scss'

import { Link } from 'react-router-dom'
import arrowImg from '../../../data/img/icon/arrow.svg'
import phone from '../../../data/img/icon/mibile_phone.svg'
import { IMobileBrand } from '../../../types/IMobileBrand'

type ChooseBrandProps = {
  brands: IMobileBrand[] | null
}

const ChooseBrand: FC<ChooseBrandProps> = ({ brands }) => {
  const popupRef = useRef<HTMLDivElement>(null)
  const popupOpenRef = useRef<HTMLImageElement>(null)
  const { popup, setPopup, closeAllPopups } = usePopup(popupRef, popupOpenRef)
  const [currentOpenedBrand, setCurrentOpenedBrand] = useState(-1)
  const openModelPhoneHandler = (e: any) => {
    const isClickedBrandEqualToCurrentOpenedBrand = +e.target.dataset.index === currentOpenedBrand
    if (isClickedBrandEqualToCurrentOpenedBrand) {
      setCurrentOpenedBrand(-1)
    } else {
      setCurrentOpenedBrand(+e.target.dataset.index)
    }
  }
  useEffect(() => {
    if (!popup) {
      setCurrentOpenedBrand(-1)
    }
  }, [popup])

  return (
    <>
      <Col
        ref={popupOpenRef}
        onClick={e => {
          setPopup(!popup)
        }}
        className={styles.phoneBrand}>
        <img className={styles.phoneImg} src={phone} alt='Mobile phone' />
        <Row className={styles.chooseBrand}>Choose phone brand</Row>
        <img className={styles.arrowImg} src={arrowImg} alt='arrow' />
      </Col>
      <Popup classes={'brandsPopup'} divRef={popupRef} popup={popup}>
        {brands?.map((brand: IMobileBrand) => (
          <React.Fragment key={Date.now() + Math.random()}>
            <div
              className={styles.title}
              data-index={brand.id}
              onClick={e => openModelPhoneHandler(e)}>
              <h2>{brand.title}</h2>
              <img
                className={
                  brand.id === currentOpenedBrand && popup
                    ? [styles.arrowDown, styles.arrowUp].join(' ')
                    : styles.arrowDown
                }
                src={arrowImg}
                alt='arrow'
              />
            </div>
            <div
              className={
                brand.id === currentOpenedBrand && popup
                  ? [styles.models, styles.active].join(' ')
                  : styles.models
              }>
              {brand.model.map(model => (
                <Link
                  onClick={() => {
                    closeAllPopups()
                    alert('Imagine, you choose another brand/model of phone')
                  }}
                  key={Date.now() + Math.random()}
                  to={'/'}>
                  {model}
                </Link>
              ))}
            </div>
          </React.Fragment>
        ))}
      </Popup>
    </>
  )
}

export default ChooseBrand
