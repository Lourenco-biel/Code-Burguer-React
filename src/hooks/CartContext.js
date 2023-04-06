import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const updateLocalStorage = async (products) => {
    await localStorage.setItem('codeburger:cartInfo', JSON.stringify(products))
  }

  const putProductInCart = async (product) => {
    const cartIndex = cartProducts.findIndex((prd) => prd.id === product.id)

    let newCartProduct = []
    if (cartIndex >= 0) {
      newCartProduct = cartProducts
      newCartProduct[cartIndex].quantity += 1
      setCartProducts(newCartProduct)
    } else {
      product.quantity = 1
      newCartProduct = [...cartProducts, product]
      setCartProducts(newCartProduct)
    }
    await updateLocalStorage(newCartProduct)
  }

  const deleteProducts = async (productId) => {
    const newCart = cartProducts.filter((prd) => prd.id !== productId)
    setCartProducts(newCart)
    await updateLocalStorage(newCart)
  }

  const increaseProducts = async (productId) => {
    const newCart = cartProducts.map((product) => {
      return product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    })

    setCartProducts(newCart)
    await updateLocalStorage(newCart)
  }

  const decreaseProducts = async (productId) => {
    const cartIndex = cartProducts.findIndex(
      (product) => product.id === productId
    )
    if (cartProducts[cartIndex].quantity > 1) {
      const newCart = cartProducts.map((product) => {
        return product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      })
      setCartProducts(newCart)
      await updateLocalStorage(newCart)
    } else {
      deleteProducts(productId)
    }
  }
  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburger:cartInfo')
      if (clientCartData) {
        setCartProducts(JSON.parse(clientCartData))
      }
    }
    loadUserData()
  }, [])

  return (
    <CartContext.Provider
      value={{
        putProductInCart,
        cartProducts,
        increaseProducts,
        decreaseProducts,
        deleteProducts
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart bust be used with UserContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
