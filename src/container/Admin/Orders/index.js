import React, { useEffect, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'

import api from '../../../services/api'
import formatDate from '../../../utils/formatData'
import status from './order-status'
import Row from './row'
import * as C from './style'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filteredOrdes, setFilteredOrdes] = useState([])
  const [activeStatus, setActiveStatus] = useState(1)
  const [rows, setRows] = useState([])

  useEffect(() => {
    async function getOrders() {
      const { data } = await api.get('orders')
      setOrders(data)
      setFilteredOrdes(data)
    }
    getOrders()
  }, [])

  function createdData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products
    }
  }

  useEffect(() => {
    const newRows = filteredOrdes.map((ord) => createdData(ord))
    setRows(newRows)
  }, [filteredOrdes])

  useEffect(() => {
    if (activeStatus === 1) {
      setFilteredOrdes(orders)
    } else {
      const statusIndex = status.findIndex((sts) => sts.id === activeStatus)
      const newFilteredOrders = orders.filter(
        (order) => order.status === status[statusIndex].value
      )
      setFilteredOrdes(newFilteredOrders)
    }
  }, [orders])

  function handleStatus(status) {
    if (status.id === 1) {
      setFilteredOrdes(orders)
    } else {
      const newOrders = orders.filter((order) => order.status === status.value)
      setFilteredOrdes(newOrders)
    }
    setActiveStatus(status.id)
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
        <C.Title>Pedidos</C.Title>
        <C.Menu>
          {status?.map((status) => (
            <C.LinkMenu
              key={status.id}
              onClick={() => handleStatus(status)}
              isActiveStatus={activeStatus === status.id}
            >
              {status.label}
            </C.LinkMenu>
          ))}
        </C.Menu>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Pedido</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Data do pedido</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row
                  key={row.orderId}
                  row={row}
                  orders={orders}
                  setOrders={setOrders}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>{' '}
      </C.Container>
    </motion.div>
  )
}
