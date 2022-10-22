import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from '../components/elements/Card/ProductCard'
import { productAPI, LEATHERURL } from '../services/productsService'
import { IProducts } from '../types/IProducts'
  
const LeatherPage = () => {
  const { data, isError, isLoading } = productAPI.useGetCasesQuery(LEATHERURL)
  return (
    <Container style={{ flex: '1 1 auto' }}>
      {false && isError && isLoading}
      <Row className='prodGridHeadphones' style={{ marginTop: 100, marginBottom: 50 }}>
        {data?.products?.map((item: IProducts) => (
          <ProductCard key={item.id} item={item} isLeather={true} />
        ))}
      </Row>
    </Container>
  )
}

export default LeatherPage
