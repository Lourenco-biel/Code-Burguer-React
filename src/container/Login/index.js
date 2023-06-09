import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import LoginImage from '../../assets/hamburguer-logo.svg'
import Logo from '../../assets/logo.svg'
import Button from '../../components/Button'
import { ErrorMenssage } from '../../components/ErrorMenssage'
import { useUser } from '../../hooks/UseContext'
import api from '../../services/api'
import {
  Container,
  LoginImg,
  ContainerItens,
  SinginLink,
  Input,
  ContainerLoading,
  Label,
  Loading
} from './styles'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const { putUserData } = useUser()
  const navigate = useNavigate()

  const schema = Yup.object({
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('E-mail é obrigatorio'),
    password: Yup.string()
      .required('Senha obrigatoria')
      .min(6, 'A senha deve ter pelo menos 6 digitos')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientData) => {
    setLoading(true)
    try {
      const { data } = await toast.promise(
        api.post('sessions', {
          email: clientData.email,
          password: clientData.password
        }),
        {
          pending: 'Verificando seus dados',
          success: 'Seja bem vindo(a)!'
        }
      )
      putUserData(data)
      setTimeout(() => {
        if (data?.admin) {
          navigate('/Pedidos')
        } else {
          navigate('/')
        }
        setLoading(false)
      }, 1000)
    } catch (error) {
      await toast.promise(Promise.reject(error), {
        error: 'Verifique seu email e senha!'
      })
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.4 }
      }}
      exit={{ opacity: 0, filter: 'blur(6px)', transition: { duration: 0.4 } }}
    >
      {loading ? (
        <ContainerLoading>
          {' '}
          <Loading></Loading>
        </ContainerLoading>
      ) : (
        <Container>
          <>
            <LoginImg src={LoginImage} alt="Login image" />
            <ContainerItens>
              <img src={Logo} alt="logo" />
              <h1>Login</h1>
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <ErrorMenssage>{errors.email?.message}</ErrorMenssage>
                <Label>Senha</Label>
                <Input
                  type="password"
                  {...register('password')}
                  error={errors.password?.message}
                />
                <ErrorMenssage>{errors.password?.message}</ErrorMenssage>
                <Button
                  type="submit"
                  style={{ marginTop: 75, marginBottom: 25 }}
                >
                  Entrar
                </Button>
              </form>
              <SinginLink>
                Não possui conta?{' '}
                <Link style={{ color: 'white' }} to="/Cadastro">
                  Sing Up
                </Link>
              </SinginLink>
            </ContainerItens>
          </>
        </Container>
      )}
    </motion.div>
  )
}

export default Login
