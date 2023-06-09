import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import Button from '../../../components/Button'
import { ErrorMenssage } from '../../../components/ErrorMenssage'
import api from '../../../services/api'
import * as C from './style'

function NewProduct() {
  const [file, setFile] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(null)

  function handleFileChange(event) {
    const file = event.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.boolean(),
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
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = async (data) => {
    const productDataFormated = new FormData()

    productDataFormated.append('name', data.name)
    productDataFormated.append('price', data.price)
    productDataFormated.append('category_id', data.category.id)
    productDataFormated.append('file', data.file[0])
    productDataFormated.append('offer', data.offer)

    await toast.promise(api.post('products', productDataFormated), {
      pending: 'Criando novo produto',
      success: 'Produto criado com sucesso',
      error: 'Falha ao criar o produto'
    })

    setTimeout(() => {
      navigate('/Listar-produtos')
    }, 2000)
  }
  useEffect(() => {
    console.log('file', selectedImage)
  }, [selectedImage])

  useEffect(() => {
    async function getCategories() {
      const { data } = await api.get('categories')
      setCategories(data)
    }
    getCategories()
  }, [])

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
        <C.Title>Crie seu produto</C.Title>
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
              <C.Input type="text" {...register('name')} />
              <ErrorMenssage>{errors.name?.message}</ErrorMenssage>
            </div>
            <div>
              <C.Label>Preço</C.Label>
              <C.Input type="number" {...register('price')} />
              <ErrorMenssage>{errors.price?.message}</ErrorMenssage>
            </div>
            <div>
              <Controller
                name="category"
                control={control}
                render={({ field }) => {
                  return (
                    <C.ReactSelectStyle
                      {...field}
                      options={categories}
                      getOptionLabel={(cat) => cat.name}
                      placeholder="...Escolha a categoria"
                    />
                  )
                }}
              ></Controller>
              <ErrorMenssage>{errors.category?.message}</ErrorMenssage>
              <C.ContainerInput>
                <input
                  type="checkbox"
                  defaultChecked={categories.offer}
                  {...register('offer')}
                />
                <C.Label>Produto em oferta?</C.Label>
              </C.ContainerInput>
            </div>
            <div>
              <C.ButtonStyle>Adicionar produto</C.ButtonStyle>
            </div>
          </C.ContainerRight>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default NewProduct
