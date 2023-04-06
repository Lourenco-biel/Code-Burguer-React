import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import productsLogo from '../../assets/products-logo.svg'
import CardProduct from '../../components/CardProduct'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import * as C from './style'

function Products() {
  const location = useLocation()
  let categoryId = 0
  if (location?.state?.categoryId) {
    categoryId = location?.state?.categoryId
  }
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategories, setActiveCategories] = useState(categoryId)

  useEffect(() => {
    async function getCategory() {
      const { data } = await api.get('/categories')
      const newCategories = [{ id: 0, name: 'todas' }, ...data]
      setCategories(newCategories)
    }
    async function getProducts() {
      const { data: allProducts } = await api.get('/products')
      const newProducts = allProducts.map((product) => {
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })
      setProducts(newProducts)
    }
    getProducts()
    getCategory()
  }, [])

  useEffect(() => {
    if (activeCategories === 0) {
      setFilteredProducts(products)
    } else {
      const newFilteredProducts = products.filter(
        (products) => products.category.id === activeCategories
      )

      setFilteredProducts(newFilteredProducts)
    }
  }, [activeCategories, products])
  return (
    <C.Container>
      <C.ProductsImg src={productsLogo} alt="logo-do-produto" />
      <C.CategoriesMenu>
        {categories?.map((category) => (
          <C.CategoryButton
            type="button"
            key={category.id}
            isActiveCategories={activeCategories === category.id}
            onClick={() => setActiveCategories(category.id)}
          >
            {category.name}
          </C.CategoryButton>
        ))}
      </C.CategoriesMenu>
      <C.ProductsContainer>
        {filteredProducts?.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </C.ProductsContainer>
    </C.Container>
  )
}

export default Products
