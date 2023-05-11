import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
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

function EditProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state.product

  useEffect(() => {
    getCategories()
  }, [])

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
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            <C.LabelUpload>
              {fileName || (
                <>
                  <CloudUploadIcon />
                  Carregue a imagem do produto
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

          <div>
            <Controller
              name="category"
              control={control}
              defaultValue={product.category}
              render={({ field }) => {
                return (
                  <ReactSelect
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
          <C.ButtonStyle>Editar produto</C.ButtonStyle>
        </form>
      </C.Container>
    </motion.div>
  )
}

export default EditProduct
