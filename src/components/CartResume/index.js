import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import Button from '../Button'
import * as C from './style'

export default function CartResume() {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax, setDeliveryTax] = useState(5)
  const navigate = useNavigate()
  const { cartProducts } = useCart()

  useEffect(() => {
    const sumAllItems = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc
    }, 0)
    setFinalPrice(sumAllItems)
  }, [cartProducts, deliveryTax])

  const submitOrder = async () => {
    const order = cartProducts.map((product) => {
      return { id: product.id, quantity: product.quantity }
    })
    if (order.length <= 0) {
      toast.error('Carrinho vazio, inclusa um item!')
      navigate('/Produtos')
    } else {
      await toast.promise(api.post('orders', { products: order }), {
        pending: 'Realizando seu pedido!',
        success: 'Pedido realizado com sucesso',
        error: 'Falha ao tentar realizar seu pedido, tente novamente!'
      })
      navigate('/')
    }
  }
  return (
    <div>
      <C.Container>
        <div className="container-top">
          <h2 className="title">Resumo do pedido</h2>
          <p className="items">Items</p>
          <p className="items-price">{formatCurrency(finalPrice)}</p>
          <p className="delivery-tax">Taxa de entrega</p>
          <p className="delivery-tax-price">{formatCurrency(deliveryTax)}</p>
        </div>
        <div className="container-bottom">
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </C.Container>
      <Button
        style={{ width: '100%', marginTop: '30px !important' }}
        onClick={() => {
          submitOrder()
        }}
      >
        Finalizar pedido
      </Button>
    </div>
  )
}
