import React from 'react'
import { Container } from 'react-bootstrap'
import ProductCard from '../components/elements/Card/ProductCard'
import { useAppSelector } from '../hooks/redux'

const FavoritePage = () => {
  const product = useAppSelector(state => state.favorite.favorite)
  return (
    <>
      <Container
        style={{ flex: '1 1 auto', marginTop: 100, marginBottom: 50 }}
        className='prodGridHeadphones'>
        {product.map(item => (
          <ProductCard key={item.id} item={item} />
        ))}
      </Container>
    </>
  )
}

export default FavoritePage
