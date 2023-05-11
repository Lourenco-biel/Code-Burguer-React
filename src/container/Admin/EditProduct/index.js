import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { motion } from 'framer-motion'
import * as Yup from 'yup'

import { ErrorMenssage } from '../../../components/ErrorMenssage'
import api from '../../../services/api'
import * as C from './style'

function EditProduct() {
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const [selectedImage, setSelectedImage] = useState(null)

  const product = location.state.product

  useEffect(() => {
    if (product?.url) {
      setSelectedImage(product.url)
    }
    getCategories()
  }, [])

  function handleFileChange(event) {
    const file = event.target.files[0]
    const imageUrl = URL.createObjectURL(file)
    setSelectedImage(imageUrl)
  }

  async function getCategories() {
    const { data } = await api.get('categories')
    setCategories(data)
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
    offer: Yup.boolean()
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

    await toast.promise(
      api.put(`products/${product.id}`, productDataFormated),
      {
        pending: 'Editando novo produto',
        success: 'Produto editado com sucesso',
        error: 'Falha ao editar o produto'
      }
    )

    setTimeout(() => {
      navigate('/Listar-produtos')
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
        <C.Title>Edite seu produto</C.Title>
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
                defaultValue={product.name}
              />
              <ErrorMenssage>{errors.name?.message}</ErrorMenssage>
            </div>
            <div>
              <C.Label>Preço</C.Label>
              <C.Input
                type="number"
                {...register('price')}
                defaultValue={product.price}
              />
              <ErrorMenssage>{errors.price?.message}</ErrorMenssage>
            </div>
            <div>
              <Controller
                name="category"
                control={control}
                defaultValue={product.category}
                render={({ field }) => {
                  return (
                    <C.ReactSelectStyle
                      {...field}
                      options={categories}
                      getOptionLabel={(cat) => cat.name}
                      placeholder="...Escolha a categoria"
                      defaultValue={product.category}
                    />
                  )
                }}
              ></Controller>
              <ErrorMenssage>{errors.category?.message}</ErrorMenssage>
            </div>

            <C.ContainerInput>
              <input
                type="checkbox"
                defaultChecked={product.offer}
                {...register('offer')}
              />
              <C.Label>Produto em oferta?</C.Label>
            </C.ContainerInput>

            <div>
              <C.ButtonStyle>Editar produto</C.ButtonStyle>
            </div>
          </C.ContainerRight>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default EditProduct
