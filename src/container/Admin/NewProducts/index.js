import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import * as Yup from 'yup'

import Button from '../../../components/Button'
import { ErrorMenssage } from '../../../components/ErrorMenssage'
import api from '../../../services/api'
import * as C from './style'

function NewProduct() {
  const [fileName, setFileName] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const schema = Yup.object().shape({
    name: Yup.string().required('Digite o nome do produto'),
    price: Yup.string().required('Digite o preço do produto'),
    category: Yup.object().required('Escolha uma categoria'),
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
    async function getCategories() {
      const { data } = await api.get('categories')
      setCategories(data)
    }
    getCategories()
  }, [])

  return (
    <C.Container>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
            render={({ field }) => {
              return (
                <ReactSelect
                  {...field}
                  options={categories}
                  getOptionLabel={(cat) => cat.name}
                  placeholder="...Escolha a categoria"
                />
              )
            }}
          ></Controller>
          <ErrorMenssage>{errors.category?.message}</ErrorMenssage>
        </div>

        <C.ButtonStyle>Adicionar produto</C.ButtonStyle>
      </form>
    </C.Container>
  )
}

export default NewProduct
