import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { motion } from 'framer-motion'

import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import * as C from './style'

function ListProducts() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts() {
    const { data } = await api.get('products')
    setProducts(data)
  }

  const deleteProduct = async (id) => {
    await toast.promise(api.delete(`products/${id}`), {
      pending: 'Deletando o produto',
      success: 'Produto deletado com sucesso',
      error: 'Falha ao deletar o produto'
    })
    getProducts()
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell align="center">Produto em Oferta</TableCell>
                <TableCell align="center">Imagem do produto</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell align="center">Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell align="center">
                    {product.offer ? (
                      <CheckCircleOutlineOutlinedIcon
                        style={{ color: '#228B22' }}
                      />
                    ) : (
                      <CancelOutlinedIcon style={{ color: '#CC1717' }} />
                    )}
                  </TableCell>
                  <TableCell align="center">
                    <C.Img src={product.url} alt={product.name} />
                  </TableCell>
                  <TableCell>
                    <C.EditIcon
                      onClick={() =>
                        navigate('/Editar-produto', {
                          state: { product }
                        })
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <C.deleteIcon onClick={() => deleteProduct(product.id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </C.Container>
    </motion.div>
  )
}

export default ListProducts
