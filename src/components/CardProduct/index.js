import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { useCart } from '../../hooks/CartContext'
import Button from '../Button'
import * as C from './style'

function CardProduct({ product }) {
  const { putProductInCart } = useCart()
  const navigate = useNavigate()
  return (
    <C.Container>
      <C.Image src={product.url} alt="imagem do produto" />
      <div>
        <C.ProductName>{product.name}</C.ProductName>
        <C.ProductPrice>{product.formatedPrice}</C.ProductPrice>
        <Button
          onClick={() => {
            putProductInCart(product)
            navigate('/Cart')
          }}
          style={{ margin: 0 }}
        >
          Adicionar
        </Button>
      </div>
    </C.Container>
  )
}

export default CardProduct

CardProduct.propTypes = {
  product: PropTypes.object
}
