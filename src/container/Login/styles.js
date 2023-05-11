import styled from 'styled-components'

import Backgroud from '../../assets/backgrooud.svg'
import loadingSvg from '../../assets/loading.svg'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url('${Backgroud}');
  display: flex;
  justify-content: center;
  align-items: center;
`
export const LoginImg = styled.img`
  height: 70%;
`

export const ContainerItens = styled.div`
  height: 70%;
  background: #373737;
  border-radius: 0 10px 10px 0;
  padding: 25px 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
  }
  h1 {
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    line-height: 28px;
    color: #ffff;
    text-align: center;
    margin-bottom: 100px;
  }
`

export const Input = styled.input`
  width: 391.42px;
  height: 38.32px;
  border: ${(props) => (props.error ? '2px solid #cc1717' : 'none')};
  border-radius: 5px;
  background: #ffff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  padding-left: 10px;
`

export const Label = styled.p`
  font-size: 12px;
  font-weight: 500;
  font-style: normal;
  line-height: 14px;
  color: #ffff;
  margin-bottom: 5px;
  margin-top: 28px;
`

export const SinginLink = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  color: #eee;

  a {
    cursor: pointer;
    text-decoration: underline;
  }
`
export const Loading = styled.div`
  width: 24rem;
  height: 15rem;
  background: url(${loadingSvg}) no-repeat center center / contain;
  z-index: 3;
`

export const ContainerLoading = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
