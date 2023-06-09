import styled from 'styled-components'

export const Container = styled.div`
  background-color: #ffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  padding: 35px 0;

  .rec.rec-arrow {
    background-color: #9758a6;
    color: #efefef;
    border: none;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  }
  .rec.rec-arrow:hover {
    border: 2px solid #9758a6;
    color: #9758a6;
    background-color: #efefef;
  }

  .rec.rec-arrow:disabled {
    border: none;
    color: #efefef;
    background-color: #bebebf;
  }
`

export const CategoryImg = styled.img``

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  p {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 120%;
    color: #424242;
  }
`

export const Button = styled.button`
  margin-top: 16px;
  border-radius: 8px;
  background: #9758a6;
  height: 50px;
  border: none;
  color: #ffff;
  font-size: 18px;
  line-height: 100%;
  font-weight: bold;
  font-style: normal;
  text-align: center;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  &:active {
    opacity: 0.7;
  }
`

export const Image = styled.img`
  width: 200px;
  height: 200px;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 16px;
`
