import styled from 'styled-components'

export const Container = styled.div`
  height: 72px;
  background-color: #ffffffff;
  box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`

export const ContainerLeft = styled.div`
  display: flex;
  gap: 30px;
`

export const ContainerRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const ContainerText = styled.div`
  p {
    font-style: normal;
    font-size: 14px;
    font-weight: 300;
    line-height: 16px;
    color: #555555;
  }
`

export const PageLinkExit = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #9758a6;
  cursor: pointer;
`

export const PageLink = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${(props) => (props.isActive ? '#9758A6' : '#555555')};
  font-weight: ${(props) => (props.isActive ? 'bold' : 'normal')};
  font-size: 16px;
  line-height: 19px;
`

export const Line = styled.div`
  height: 40px;
  border: 0.5px solid #bababa;
`
