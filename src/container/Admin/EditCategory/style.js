/* import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styled from 'styled-components'

import Button from '../../../components/Button'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    background: #565656;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`

export const Label = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 3px;
`

export const Input = styled.input`
  width: 100%;
  min-width: 280px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  border: none;
  padding-left: 10px;
`

export const ButtonStyle = styled(Button)`
  width: 100%;
  margin-top: 30px;
`
export const LabelUpload = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px dashed #ffffff;
  border-radius: 5px;
  padding: 10px;
  gap: 10px;

  input {
    opacity: 0;
    width: 1px;
  }
`
export const ContainerInput = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;

  input {
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`
 */

import ReactSelect from 'react-select'

import styled from 'styled-components'

import Button from '../../../components/Button'

export const Container = styled.div`
  height: 100%;

  form {
    width: 100%;
    height: calc(100vh - 97px);
    padding: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20%;
  }
`

export const Label = styled.p`
  font-size: 14px;
  color: black;
  margin-bottom: 3px;
`

export const Input = styled.input`
  width: 100%;
  min-width: 280px;
  height: 48px;
  border-radius: 8px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  border: none;
  padding-left: 10px;
  margin-bottom: 2rem;
`

export const ButtonStyle = styled(Button)`
  width: 100%;
  margin-top: 80px;
`
export const LabelUpload = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px dashed #8ca4b1;
  border-radius: 8px;
  padding: ${(props) => (props.image ? '6.5rem 7rem' : '14rem 8rem')};
  cursor: pointer;

  input {
    opacity: 0;
    width: 1px;
  }
`
export const ContainerLeft = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ContainerRight = styled.div`
  box-sizing: border-box;
  background: rgb(239, 239, 239);
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: flex-start;
  padding: 8rem 3rem 3rem 3rem;
`

export const Title = styled.h1`
  font-size: 40px;
  color: black;
  padding-left: 30px;
`
export const ReactSelectStyle = styled(ReactSelect)`
  width: 100%;
  margin-bottom: 2rem;
  outline: none;
  border-style: none;
  .css-13cymwt-control {
    cursor: pointer;
    border: none;
    outline: none;
    min-width: 280px;
    height: 48px;
    border-radius: 8px;
  }
`

export const Image = styled.img`
  width: 14rem;
  height: 12rem;
  margin-bottom: 2rem;
`
