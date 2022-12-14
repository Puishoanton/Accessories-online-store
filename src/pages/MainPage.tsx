import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/elements/Card/ProductCard'
import previewImg from '../data/img/iPhone-13-Pro-Max-silver-1000x1000 1.png'
import CasesCard from '../components/elements/Card/CasesCard'
import { productAPI } from '../services/productsService'
import { CasesType, IProducts } from '../types/IProducts'
import { useSortProducts } from '../hooks/useSortProducts'
import Sort from '../components/UI/Sort/Sort'
import Loader from '../components/UI/Loader/Loader'

const MainPage = () => {
  const [sortW, setSortW] = useState('popular')
  const [sortH, setSortH] = useState('popular')
  const {
    data: headphones,
    isError: hError,
    isLoading: hIsLoading,
  } = productAPI.useGetHeadphonesQuery()
  const { data: cases, isError: cError, isLoading: cIsLoading } = productAPI.useGetAllCasesQuery()
  const {
    data: wirelessHeadphones,
    isError: wError,
    isLoading: wIsLoading,
  } = productAPI.useGetWirelessQuery()

  const sortedWirelessHeadphones = useSortProducts(
    sortW,
    wirelessHeadphones?.wirelessHeadPhones || []
  )
  const sortedHeadphones = useSortProducts(sortH, headphones?.headPhones || [])
  return (
    <Container className='mainContainer'>
      {false && wError && wIsLoading && cError && hError}
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
        {cIsLoading ? (
          <Loader />
        ) : (
          cases?.cases.map((item: CasesType) => <CasesCard key={item.id} item={item} />)
        )}
      </Row>
      <h1>{wirelessHeadphones?.title}</h1>
      {hError
        ? 'Oops, some error happened. Try to check the Internet connection and refresh page'
        : !hIsLoading && (
            <Sort
              typeofSorting={sortH}
              setTypeofSorting={setSortW}
              options={[
                { value: 'name', title: 'Name' },
                { value: 'price', title: 'Price' },
                { value: 'discount', title: 'Discount' },
                { value: 'popular', title: 'Popular' },
              ]}
            />
          )}
      <Row className='prodGridHeadphones'>
        {wIsLoading ? (
          <Loader />
        ) : (
          sortedWirelessHeadphones?.map((item: IProducts) => (
            <ProductCard key={item.id} item={item} isWireless={true} />
          ))
        )}
      </Row>
      <h1>{headphones?.title}</h1>
      {wError
        ? 'Oops, some error happened. Try to check the Internet connection and refresh page'
        : !wIsLoading && (
            <Sort
              typeofSorting={sortW}
              setTypeofSorting={setSortH}
              options={[
                { value: 'name', title: 'Name' },
                { value: 'price', title: 'Price' },
                { value: 'discount', title: 'Discount' },
                { value: 'popular', title: 'Popular' },
              ]}
            />
          )}
      <Row className='prodGridHeadphones'>
        {hIsLoading ? (
          <Loader />
        ) : (
          sortedHeadphones.map((item: IProducts) => (
            <ProductCard key={item.id} item={item} isWired={true} />
          ))
        )}
      </Row>
    </Container>
  )
}

export default MainPage
