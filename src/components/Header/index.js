import React from 'react'
import { useNavigate } from 'react-router-dom'

import cart from '../../assets/cart.png'
import User from '../../assets/user.png'
import { useUser } from '../../hooks/UseContext'
import * as C from './style'

export function Header() {
  const navigate = useNavigate()
  const { logout, userData } = useUser()
  return (
    <C.Container>
      <C.ContainerLeft>
        <C.PageLink onClick={() => navigate('/')} isActive={'' === '/'}>
          Home
        </C.PageLink>
        <C.PageLink onClick={() => navigate('/Produtos')}>
          Ver produto
        </C.PageLink>
      </C.ContainerLeft>
      <C.ContainerRight>
        <C.PageLink onClick={() => navigate('/Cart')}>
          <img src={cart} alt="carrinho" />
        </C.PageLink>
        <C.Line></C.Line>
        <C.PageLink>
          <img src={User} alt="usuario" />
        </C.PageLink>
        <C.ContainerText>
          <p>Olá, {userData?.name}</p>
          <C.PageLinkExit
            onClick={() => {
              logout()
              navigate('/Login')
            }}
          >
            Sair
          </C.PageLinkExit>
        </C.ContainerText>
      </C.ContainerRight>
    </C.Container>
  )
}
