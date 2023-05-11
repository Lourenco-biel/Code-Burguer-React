import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import Logo from '../../assets/logo.svg'
import registerImage from '../../assets/register.svg'
import Button from '../../components/Button'
import { ErrorMenssage } from '../../components/ErrorMenssage'
import api from '../../services/api'
import {
  Container,
  LoginImg,
  ContainerItens,
  SinginLink,
  Input,
  Label
} from './styles'

const Register = () => {
  const schema = Yup.object({
    name: Yup.string().required('Digite seu nome'),
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('E-mail é obrigatorio'),
    password: Yup.string()
      .required('Senha obrigatoria')
      .min(6, 'A senha deve ter pelo menos 6 digitos'),
    confirmPassword: Yup.string()
      .required('Senha obrigatoria')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientData) => {
    const { status } = await api.post(
      'users',
      {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password
      },
      { validateStatus: () => true }
    )
    try {
      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('Email ja cadastrado! faça login para continuar')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Erro no servidor, tente novamente!')
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
      <Container>
        <LoginImg src={registerImage} alt="resgister image" />
        <ContainerItens>
          <img src={Logo} alt="logo" />
          <h1>Cadastre-se</h1>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Label error={errors.name?.message}>Nome</Label>
            <Input
              type="text"
              {...register('name')}
              error={errors.name?.message}
            />
            <Label error={errors.email?.message}>Email</Label>
            <Input
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <ErrorMenssage>{errors.email?.message}</ErrorMenssage>
            <Label error={errors.password?.message}>Senha</Label>
            <Input
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
            <ErrorMenssage>{errors.password?.message}</ErrorMenssage>
            <Label error={errors.confirmPassword?.message}>
              Confirmar Senha
            </Label>
            <Input
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <ErrorMenssage>{errors.confirmPassword?.message}</ErrorMenssage>
            <Button type="submit" style={{ marginTop: 25, marginBottom: 25 }}>
              Cadastrar
            </Button>
          </form>
          <SinginLink>
            Já possui conta?{' '}
            <Link style={{ color: 'white' }} to="/Login">
              Sing In
            </Link>
          </SinginLink>
        </ContainerItens>
      </Container>
    </motion.div>
  )
}

export default Register
