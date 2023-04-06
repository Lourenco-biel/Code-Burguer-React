import { Link } from 'react-router-dom'

import styled from 'styled-components'

export const Container = styled.div`
  background: #3c3c3c;
  box-shadow: 8px 0px 14px rgba(0, 0, 0, 0.15);
  width: 308px;
  top: 0;
  left: 0;

  hr {
    margin: 50px 15px;
  }
`

export const ItemContainer = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  background: ${(props) => (props.IsActive ? '#565656' : 'none')};
  border-radius: 2px;
  margin: 8px;
  padding-left: 20px;

  .icon {
    color: #ffff;
  }
`

export const ListLink = styled(Link)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #ffffffff;
  text-decoration: none;
  margin-left: 8px;
`
