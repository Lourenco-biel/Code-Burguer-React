import React, { useState } from 'react'

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: '1',
      status: 'CREATED',
      customer: {
        name: 'antonio',
        cell_phone: '5511988711234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '1234',
        items: [
          {
            amount: '56',
            description: 'lasanha',
            additionals: [
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              },
              {
                amount: '6',
                description: 'maionese'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'molho'
              }
            ]
          },
          {
            amount: '56',
            description: 'Carne',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              },
              {
                amount: '6',
                description: 'maionese'
              }
            ]
          }
        ]
      }
    },
    {
      id: '2',
      status: 'PAID',
      customer: {
        name: 'Gabriel',
        cell_phone: '5511988891234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '1234',
        items: [
          {
            amount: '56',
            description: 'Carne',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              },
              {
                amount: '6',
                description: 'maionese'
              }
            ]
          }
        ]
      }
    },
    {
      id: '3',
      status: 'IN-PREPARATION',
      customer: {
        name: 'Gabriel',
        cell_phone: '5511988891234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '345',
        items: [
          {
            amount: '56',
            description: 'Churrasco de picanha',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              }
            ]
          }
        ]
      }
    },
    {
      id: '4',
      status: 'PAID',
      customer: {
        name: 'Gabriel',
        cell_phone: '5511988891234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '345',
        items: [
          {
            amount: '56',
            description: 'Carne',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              }
            ]
          }
        ]
      }
    },
    {
      id: '5',
      status: 'PAID',
      customer: {
        name: 'Gabriel',
        cell_phone: '5511988891234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '345',
        items: [
          {
            amount: '56',
            description: 'Carne',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              }
            ]
          }
        ]
      }
    },
    {
      id: '6',
      status: 'IN-PREPARATION',
      customer: {
        name: 'Gabriel',
        cell_phone: '5511988891234'
      },
      created_at: {
        $date: {
          $numberLong: '22-09-2023'
        }
      },
      cart: {
        uuid_box_center: '345',
        items: [
          {
            amount: '56',
            description: 'Carne',
            additionals: [
              {
                amount: '6',
                description: 'Arroz'
              },
              {
                amount: '6',
                description: 'molho'
              },
              {
                amount: '6',
                description: 'pimenta'
              }
            ]
          }
        ]
      }
    }
  ])

  return (
    <>
      <p>Total: {orders.length} pedidos</p>
      <div className="orders-cards" style={{ margin: '0' }}>
        {orders &&
          orders.map((order, id) => {
            return (
              <div key={`order-card-${id}`} className="order-card">
                <span className="order-status">
                  <span># {id + 1}</span>
                  <span
                    className={
                      order.status && order.status === 'CREATED'
                        ? 'CREATED'
                        : order.status && order.status === 'PAID'
                        ? 'PAID'
                        : order.status && order.status === 'IN-PREPARATION'
                        ? 'IN-PREPARATION'
                        : ''
                    }
                  >
                    <span
                      className={
                        order.status && order.status === 'CREATED'
                          ? 'confirm-status'
                          : order.status && order.status === 'PAID'
                          ? 'paid-status'
                          : order.status && order.status === 'IN-PREPARATION'
                          ? 'in-preparation-status'
                          : ''
                      }
                    ></span>
                    {order.status && order.status === 'CREATED'
                      ? 'Pronto'
                      : order.status && order.status === 'PAID'
                      ? 'PAGO'
                      : order.status && order.status === 'IN-PREPARATION'
                      ? 'Em preparo'
                      : ''}
                  </span>
                </span>
                <div className="order-items">
                  {order.cart &&
                    order.cart.items &&
                    order.cart.items.length !== 0 &&
                    order.cart.items.map((item, itemId) => {
                      return (
                        <div
                          key={`order-item-${itemId}`}
                          className="order-item"
                        >
                          <span>
                            {item.amount && item.amount}x{' '}
                            {item.description && item.description}
                          </span>
                          <div>
                            {item.additionals &&
                              item.additionals.length !== 0 &&
                              item.additionals.map(
                                (additional, additionalId) => {
                                  return (
                                    <div
                                      key={`order-additional-${additionalId}`}
                                      className="order-additional"
                                    >
                                      <span>
                                        {additional.amount && additional.amount}
                                        x{' '}
                                        {additional.description &&
                                          additional.description}
                                      </span>
                                    </div>
                                  )
                                }
                              )}
                          </div>
                        </div>
                      )
                    })}
                </div>
                <span className="order-cell">
                  <div className="cell-icon"></div>
                  {order.customer && order.customer.cell_phone
                    ? order.customer.cell_phone
                    : ''}
                </span>
                {order.cart && order.cart.uuid_box_center && (
                  <div className="order-buttons">
                    <button
                      className="cancel"
                      onClick={() => console.log('cancelando')}
                    >
                      <span className="delete-icon"></span>CANCELAR
                    </button>
                    <button
                      className="confirm"
                      onClick={() => console.log('aprovando')}
                    >
                      <span className="confirm-status"></span>APROVAR
                    </button>
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </>
  )
}

export default Orders
