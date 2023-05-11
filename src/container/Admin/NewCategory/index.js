import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import { ErrorMenssage } from '../../../components/ErrorMenssage'
import api from '../../../services/api'
import * as C from './style'

function NewCategory() {
  const [fileName, setFileName] = useState(null)
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da categoria'),
    file: Yup.mixed()
      .test('required', 'Carregue um arquivo', (value) => {
        return value?.length > 0
      })
      .test('fileSize', 'Carregue um arquivo de até 2mb', (value) => {
        return value[0]?.size <= 200000
      })
      .test('type', 'Carregue apenas arquivos JPEG', (value) => {
        return value[0]?.type === 'image/jpeg' || value[0]?.type === 'image/png'
      })
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data) => {
    const productDataFormated = new FormData()

    productDataFormated.append('name', data.name)
    productDataFormated.append('file', data.file[0])

    await toast.promise(api.post('categories', productDataFormated), {
      pending: 'Criando nova categoria',
      success: 'Categoria criada com sucesso',
      error: 'Falha ao criar a categoria'
    })

    setTimeout(() => {
      navigate('/Listar-categorias')
    }, 2000)
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
      <C.Container>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div>
            <C.Label>Nome</C.Label>
            <C.Input type="text" {...register('name')} />
            <ErrorMenssage>{errors.name?.message}</ErrorMenssage>
          </div>

          <div>
            <C.LabelUpload>
              {fileName || (
                <>
                  <CloudUploadIcon />
                  Carregue a imagem da categoria
                </>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                {...register('file')}
                onChange={(e) => setFileName(e.target.files[0]?.name)}
              />
            </C.LabelUpload>
            <ErrorMenssage>{errors.file?.message}</ErrorMenssage>
          </div>
          <C.ButtonStyle>Adicionar categoria</C.ButtonStyle>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default NewCategory
