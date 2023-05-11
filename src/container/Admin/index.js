import React from 'react'
import { useLocation } from 'react-router-dom'

import { motion } from 'framer-motion'

import SideMenuAdmin from '../../components/SideMenuAdmin'
import paths from '../../constats/paths'
import EditCategory from './EditCategory'
import EditProduct from './EditProduct'
import ListCategories from './ListCategories'
import ListProducts from './ListProducts'
import NewCategory from './NewCategory'
import NewProduct from './NewProducts'
import Orders from './Orders'
import * as C from './style'

export default function Admin() {
  const location = useLocation()
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
        <SideMenuAdmin />
        <C.ContainerItems>
          {location.pathname === paths.Order && <Orders />}
          {location.pathname === paths.Products && <ListProducts />}
          {location.pathname === paths.Categories && <ListCategories />}
          {location.pathname === paths.NewProduct && <NewProduct />}
          {location.pathname === paths.NewCategory && <NewCategory />}
          {location.pathname === paths.EditProduct && <EditProduct />}
          {location.pathname === paths.EditCategory && <EditCategory />}
        </C.ContainerItems>
      </C.Container>
    </motion.div>
  )
}
