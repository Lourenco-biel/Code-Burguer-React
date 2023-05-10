import React from 'react'

import { useCart } from '../../hooks/CartContext'
import formatedCurrency from '../../utils/formatCurrency'
import * as C from './style'
export function CartItems() {
  const { cartProducts, increaseProducts, decreaseProducts } = useCart()

  return (
    <C.Container>
      <C.Header>
        <p></p>
        <p>Items</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
      </C.Header>

      {cartProducts && cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <C.Body key={product.id}>
            <img src={product.url} />
            <p style={{ width: '100px', maxWidth: '100px' }}>{product.name}</p>
            <p>{formatedCurrency(product.price)}</p>
            <C.QuantityContainer>
              <button onClick={() => decreaseProducts(product.id)}>-</button>
              <p>{product.quantity}</p>
              <button onClick={() => increaseProducts(product.id)}>+</button>
            </C.QuantityContainer>
            <p>{formatedCurrency(product.quantity * product.price)}</p>
          </C.Body>
        ))
      ) : (
        <C.EmptyCart>Carrinho vazio</C.EmptyCart>
      )}
    </C.Container>
  )
}
