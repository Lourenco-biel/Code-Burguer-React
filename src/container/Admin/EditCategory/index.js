/*

function EditCategory() {
  const [fileName, setFileName] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const category = location.state.category

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da categoria')
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

    await toast.promise(
      api.put(`categories/${category.id}`, productDataFormated),
      {
        pending: 'Editando categoria',
        success: 'Categoria editada com sucesso',
        error: 'Falha ao editar a categoria'
      }
    )

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
            <C.Input
              type="text"
              {...register('name')}
              defaultValue={category.name}
            />
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
          <C.ButtonStyle>Editar categoria</C.ButtonStyle>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default EditCategory
 */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import { ErrorMenssage } from '../../../components/ErrorMenssage'
import api from '../../../services/api'
import * as C from './style'

function EditCategory() {
  const [selectedImage, setSelectedImage] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const category = location.state.category

  useEffect(() => {
    if (category?.url) {
      setSelectedImage(category.url)
    }
  }, [category])

  function handleFileChange(event) {
    const file = event.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome da categoria')
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

    await toast.promise(
      api.put(`categories/${category.id}`, productDataFormated),
      {
        pending: 'Editando categoria',
        success: 'Categoria editada com sucesso',
        error: 'Falha ao editar a categoria'
      }
    )

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
        <C.Title>Edite sua categoria</C.Title>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <C.ContainerLeft>
            <div>
              <C.LabelUpload image={selectedImage}>
                {selectedImage ? (
                  <>
                    <C.Image src={selectedImage} alt="foto-produto" />
                    <CloudUploadIcon />
                    Deseja mudar a imagem do produto?
                  </>
                ) : (
                  <>
                    <CloudUploadIcon />
                    Carregue a imagem do produto
                  </>
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register('file')}
                  onChange={(e) => handleFileChange(e)}
                />
              </C.LabelUpload>
              <ErrorMenssage>{errors.file?.message}</ErrorMenssage>
            </div>
          </C.ContainerLeft>
          <C.ContainerRight>
            <div>
              <C.Label>Nome</C.Label>
              <C.Input
                type="text"
                {...register('name')}
                defaultValue={category.name}
              />
              <ErrorMenssage>{errors.name?.message}</ErrorMenssage>
            </div>
            <div>
              <C.ButtonStyle>Adicionar categoria</C.ButtonStyle>
            </div>
          </C.ContainerRight>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default EditCategory
