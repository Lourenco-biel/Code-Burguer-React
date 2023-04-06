import React from 'react'

import CartLogo from '../../assets/cart-image.svg'
import { CartItems } from '../../components/CartItems'
import CartResume from '../../components/CartResume'
import * as C from './style'

export default function Cart() {
  return (
    <C.Container>
      <C.CartImg src={CartLogo} alt="logo do carrinho" />
      <C.Wrapper>
        <CartItems />
        <CartResume />
      </C.Wrapper>
    </C.Container>
  )
}
