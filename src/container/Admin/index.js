import React from 'react'
import { useLocation } from 'react-router-dom'

import SideMenuAdmin from '../../components/SideMenuAdmin'
import paths from '../../constats/paths'
import EditProduct from './EditProduct'
import ListProducts from './ListProducts'
import NewProduct from './NewProducts'
import Orders from './Orders'
import * as C from './style'

export default function Admin() {
  const location = useLocation()
  return (
    <C.Container>
      <SideMenuAdmin />
      <C.ContainerItems>
        {location.pathname === paths.Order && <Orders />}
        {location.pathname === paths.Products && <ListProducts />}
        {location.pathname === paths.NewProduct && <NewProduct />}
        {location.pathname === paths.EditProduct && <EditProduct />}
      </C.ContainerItems>
    </C.Container>
  )
}
