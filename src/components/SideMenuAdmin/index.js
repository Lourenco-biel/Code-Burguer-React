import React from 'react'
import { useLocation } from 'react-router-dom'

import LogoutIcon from '@mui/icons-material/Logout'

import { useUser } from '../../hooks/UseContext'
import listLinks from './menu-list'
import * as C from './style'

export default function SideMenuAdmin() {
  const { logout } = useUser()
  const location = useLocation()

  return (
    <C.Container>
      <hr></hr>
      {listLinks?.map((item) => (
        <C.ItemContainer
          key={item.id}
          IsActive={location.pathname === item.link}
        >
          <item.icon className="icon" />
          <C.ListLink to={item.link}>{item.label}</C.ListLink>
        </C.ItemContainer>
      ))}
      <hr></hr>
      <C.ItemContainer style={{ position: 'fixed', bottom: '30px' }}>
        <LogoutIcon style={{ color: '#ffffff' }} />
        <C.ListLink to="/Login" onClick={logout}>
          Sair
        </C.ListLink>
      </C.ItemContainer>
    </C.Container>
  )
}
