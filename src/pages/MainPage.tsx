import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/elements/Card/ProductCard'
import previewImg from '../data/img/iPhone-13-Pro-Max-silver-1000x1000 1.png'
import CasesCard from '../components/elements/Card/CasesCard'
import {
  CASESTYPEURL,
  HEADPHONESURL,
  productAPI,
  WIRELESSHEADPHONESURL,
} from '../services/productsService'
import { CasesType, IProducts } from '../types/IProducts'

const MainPage = () => {
  const {
    data: headphones,
    isError: hError,
    isLoading: hIsloading,
  } = productAPI.useGetProductsQuery(HEADPHONESURL)
  const {
    data: cases,
    isError: cError,
    isLoading: cIsloading,
  } = productAPI.useGetProductsQuery(CASESTYPEURL)
  const {
    data: wirelessHeadphones,
    isError: wError,
    isLoading: wIsLoading,
  } = productAPI.useGetProductsQuery(WIRELESSHEADPHONESURL)

  return (
    <Container className='mainContainer'>
      {false && wError && wIsLoading && cError && cIsloading && hError && hIsloading}
      <Row className='decorPreview'>
        <div className='title'>
          <h1>
            Accessories for your <span>phone</span>
          </h1>
        </div>
        <div className='photoPreview'>
          <img src={previewImg} alt='preview' />
        </div>
      </Row>
      <h1>{cases?.title}</h1>
      <Row className='prodGridHeadphones'>
        {cases?.cases.map((item: CasesType) => (
          <CasesCard key={item.id} item={item} />
        ))}
      </Row>
      <h1>{wirelessHeadphones?.title}</h1>
      <Row className='prodGridHeadphones'>
        {wirelessHeadphones?.wirelessHeadPhones.map((item: IProducts) => (
          <ProductCard key={item.id} item={item} isWireless={true} />
        ))}
      </Row>
      <h1>{headphones?.title}</h1>
      <Row className='prodGridHeadphones'>
        {headphones?.headPhones.map((item: IProducts) => (
          <ProductCard key={item.id} item={item} isWired={true} />
        ))}
      </Row>
    </Container>
  )
}

export default MainPage
