import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'

import CategoryLogo from '../../assets/category.png'
import api from '../../services/api'
import * as C from './style'

function CategoryCarousel() {
  const [category, setCategory] = useState([])

  useEffect(() => {
    async function getCategory() {
      const { data } = await api.get('/categories')
      setCategory(data)
    }
    getCategory()
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
      <C.CategoryImg src={CategoryLogo} alt="Logo-categoria" />
      <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}
      >
        {category?.map((category) => (
          <C.ContainerItems key={category.id}>
            <C.Image src={category.url} alt="foto-da-categoria" />
            <C.Button to="/Produtos" state={{ categoryId: category.id }}>
              {category.name}
            </C.Button>
          </C.ContainerItems>
        ))}
      </Carousel>
    </C.Container>
  )
}

export default CategoryCarousel
