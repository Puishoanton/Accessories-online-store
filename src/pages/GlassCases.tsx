import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { productAPI, GLASSURL } from '../services/productsService'
import { IProducts } from '../types/IProducts'
import ProductCard from '../components/elements/Card/ProductCard'
import Sort from '../components/UI/Sort/Sort'
import { useSortProducts } from '../hooks/useSortProducts'
import Loader from '../components/UI/Loader/Loader'

const ProductGlassPage = () => {
  const { data, isError, isLoading } = productAPI.useGetCasesQuery(GLASSURL)
  const [sort, setSort] = useState('popular')
  const sortedCases = useSortProducts(sort, data?.products || [])

  return (
    <Container style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}>
      {isError
        ? 'Oops, some error happened. Try to check the Internet connection and refresh page'
        : !isLoading && (
            <Sort
              typeofSorting={sort}
              setTypeofSorting={setSort}
              options={[
                { value: 'name', title: 'Name' },
                { value: 'price', title: 'Price' },
                { value: 'discount', title: 'Discount' },
                { value: 'popular', title: 'Popular' },
              ]}
            />
          )}
      <Row className='prodGridHeadphones'>
        {isLoading ? (
          <Loader />
        ) : (
          sortedCases.map((item: IProducts) => (
            <ProductCard key={item.id} item={item} isGlass={true} />
          ))
        )}
      </Row>
    </Container>
  )
}

export default ProductGlassPage
