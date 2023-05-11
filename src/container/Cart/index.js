import React from 'react'

import { motion } from 'framer-motion'

import CartLogo from '../../assets/cart-image.svg'
import { CartItems } from '../../components/CartItems'
import CartResume from '../../components/CartResume'
import * as C from './style'

export default function Cart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.4 }
      }}
      exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.4 } }}
    >
      <C.Container>
        <C.CartImg src={CartLogo} alt="logo do carrinho" />
        <C.Wrapper>
          <CartItems />
          <CartResume />
        </C.Wrapper>
      </C.Container>
    </motion.div>
  )
}
