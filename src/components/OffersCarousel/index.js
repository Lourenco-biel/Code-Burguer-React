import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useNavigate } from 'react-router-dom'

import offerLogo from '../../assets/offer.png'
import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import * as C from './style'

function OffersCarousel() {
  const [offers, setOffers] = useState([])
  const { putProductInCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    async function getOffers() {
      const { data } = await api.get('/products')
      console.log('AllProducts', data)
      const onlyOffer = data
        .filter((product) => product.offer)
        .map((product) => {
          return { ...product, formatedPrice: formatCurrency(product.price) }
        })
      setOffers(onlyOffer)
    }
    getOffers()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <C.Container>
      <C.CategoryImg src={offerLogo} alt="Logo-de-oferta" />
      <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {offers?.map((product) => (
          <C.ContainerItems key={product.id}>
            <C.Image src={product.url} alt="foto-do-produto" />
            <p>{product.name}</p>
            <p>{product.formatedPrice}</p>
            <C.Button
              onClick={() => {
                putProductInCart(product)
                navigate('/Cart')
              }}
            >
              Peça agora!
            </C.Button>
          </C.ContainerItems>
        ))}
      </Carousel>
    </C.Container>
  )
}

export default OffersCarousel
