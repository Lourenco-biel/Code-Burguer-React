import React, { useEffect } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate
} from 'react-router-dom'

import PropTypes from 'prop-types'

import { Header } from '../components/Header'
import Admin from '../container/Admin'
import ListProducts from '../container/Admin/ListProducts'
import Cart from '../container/Cart'
import Home from '../container/Home'
import Login from '../container/Login'
import Products from '../container/Products'
import Register from '../container/Register'

export default function MyRoutes() {
  const router = createBrowserRouter([
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/Cadastro',
      element: <Register />
    },
    {
      path: '/',
      element: (
        <PrivateRoute isAdmin={false}>
          <Home />
        </PrivateRoute>
      )
    },
    {
      path: '/Produtos',
      element: (
        <PrivateRoute isAdmin={false}>
          <Products />
        </PrivateRoute>
      )
    },
    {
      path: '/Cart',
      element: (
        <PrivateRoute isAdmin={false}>
          <Cart />
        </PrivateRoute>
      )
    },
    {
      path: '/Pedidos',
      element: (
        <PrivateRoute isAdmin={true}>
          <Admin />
        </PrivateRoute>
      )
    },
    {
      path: '/Listar-produtos',
      element: (
        <PrivateRoute isAdmin={true}>
          <Admin />
        </PrivateRoute>
      )
    },
    {
      path: '/Novo-produto',
      element: (
        <PrivateRoute isAdmin={true}>
          <Admin />
        </PrivateRoute>
      )
    },
    {
      path: '/Editar-produto',
      element: (
        <PrivateRoute isAdmin={true}>
          <Admin />
        </PrivateRoute>
      )
    }
  ])
  return <RouterProvider router={router} />
}

function PrivateRoute({ children, isAdmin }) {
  const user = localStorage.getItem('codeburger:userData')
  const navigate = useNavigate()

  useEffect(() => {
    if (JSON.parse(user) && JSON.parse(user).admin === false) {
      return navigate('/')
    }
    if (!user) {
      return navigate('/Login')
    }
  }, [])

  return (
    <>
      {!isAdmin && <Header />}
      {children}
    </>
  )
}

PrivateRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}
