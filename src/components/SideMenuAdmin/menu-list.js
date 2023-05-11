import AddCircleIcon from '@mui/icons-material/AddCircle'
import CategoryIcon from '@mui/icons-material/Category'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import paths from '../../constats/paths'

const listLinks = [
  {
    id: 1,
    label: 'Pedidos',
    link: paths.Order,
    icon: LocalMallIcon
  },
  {
    id: 2,
    label: 'Listar Produtos',
    link: paths.Products,
    icon: ShoppingCartIcon
  },
  {
    id: 3,
    label: 'Listar Categorias',
    link: paths.Categories,
    icon: CategoryIcon
  },
  {
    id: 4,
    label: 'Novo Produto',
    link: paths.NewProduct,
    icon: AddCircleIcon
  },
  {
    id: 5,
    label: 'Nova Categoria',
    link: paths.NewCategory,
    icon: AddCircleIcon
  }
]

export default listLinks
