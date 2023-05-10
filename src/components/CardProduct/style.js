import styled from 'styled-components'

export const Container = styled.div`
  background: #ffff;
  border-radius: 30px;
  box-shadow: 0px 30px 60px rgba(57, 57, 57, 0.1);
  display: flex;
  gap: 12px;
  padding: 16px;
  width: max-content;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`

export const Image = styled.img`
  width: 150px;
  height: 140px;
  border-radius: 10px;
`

export const ProductName = styled.p`
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`

export const ProductPrice = styled.p`
  font-weight: 500;
  font-style: normal;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`
