import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/elements/Card/ProductCard'
import previewImg from '../data/img/iPhone-13-Pro-Max-silver-1000x1000 1.png'
import CasesCard from '../components/elements/Card/CasesCard'
import { productAPI } from '../services/productsService'
import { CasesType, IProducts } from '../types/IProducts'
import { useSortProducts } from '../hooks/useSortProducts'
import Sort from '../components/UI/Sort/Sort'

const MainPage = () => {
  const [sortW, setSortW] = useState('popular')
  const [sortH, setSortH] = useState('popular')
  const {
    data: headphones,
    isError: hError,
    isLoading: hIsloading,
  } = productAPI.useGetHeadphonesQuery()
  const { data: cases, isError: cError, isLoading: cIsloading } = productAPI.useGetAllCasesQuery()
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
      <Sort
        typeofSorting={sortW}
        setTypeofSorting={setSortW}
        options={[
          { value: 'name', title: 'Name' },
          { value: 'price', title: 'Price' },
          { value: 'discount', title: 'Discount' },
          { value: 'popular', title: 'Popular' },
        ]}
      />
      <Row className='prodGridHeadphones'>
        {sortedWirelessHeadphones?.map((item: IProducts) => (
          <ProductCard key={item.id} item={item} isWireless={true} />
        ))}
      </Row>
      <h1>{headphones?.title}</h1>
      <Sort
        typeofSorting={sortH}
        setTypeofSorting={setSortH}
        options={[
          { value: 'name', title: 'Name' },
          { value: 'price', title: 'Price' },
          { value: 'discount', title: 'Discount' },
          { value: 'popular', title: 'Popular' },
        ]}
      />
      <Row className='prodGridHeadphones'>
        {sortedHeadphones.map((item: IProducts) => (
          <ProductCard key={item.id} item={item} isWired={true} />
        ))}
      </Row>
    </Container>
  )
}

export default MainPage
