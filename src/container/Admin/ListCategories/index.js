import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { motion } from 'framer-motion'

import api from '../../../services/api'
import * as C from './style'

function ListCategories() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories() {
    const { data } = await api.get('categories')
    setCategories(data)
  }

  const deleteCategory = async (id) => {
    await toast.promise(api.delete(`categories/${id}`), {
      pending: 'Deletando a categoria',
      success: 'Categoria deletada com sucesso',
      error: 'Falha ao deletar a categoria'
    })
    getCategories()
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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="center">Imagem da categoria</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell align="center">Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell align="center">
                    <C.Img src={category.url} alt={category.name} />
                  </TableCell>
                  <TableCell>
                    <C.EditIcon
                      onClick={() =>
                        navigate('/Editar-categoria', {
                          state: { category }
                        })
                      }
                    />
                  </TableCell>
                  <TableCell align="center">
                    <C.deleteIcon onClick={() => deleteCategory(category.id)} />
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

export default ListCategories
