import express from 'express'
import {
  daoProducts, daoCart
} from './daos/index.js'
const { Router } = express

const app = express()

const isAdmin = true

const isAdminFalse = (path, method) => {
  const error = {
    error: 1
  }
  if (path && method) {
    error.description = `Path ${path}, Method ${method} Not Allowed`
  } else {
    error.description = 'Not Allowed'
  }

  return error
}

const isAutenticated = (request, response, next) => {
  if (!isAdmin) response.json(isAdminFalse)
  else next()
}

const productsRouter = new Router()
const cartRouter = new Router()

productsRouter.get('/', async (request, response) => {
  const prods = await daoProducts.getAll()

  response.json(prods)
})

productsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  response.json(await daoProducts.getById(id))
})

productsRouter.post('/', isAutenticated, async (request, response) => {
  const postProduct = request.body
  const timestamp = Date.now()

  response.json({ id: await daoProducts.save({ timestamp, postProduct }) })
})

productsRouter.put('/:id', isAutenticated, async (request, response) => {
  const id = request.params.id
  const body = request.body

  response.json(await daoProducts.update(body, id))
})

productsRouter.delete('/:id', isAutenticated, async (request, response) => {
  const id = request.params.id

  response.json(await daoProducts.deleteById(id))
})

cartRouter.get('/', async (request, response) => {
  response.json((await daoCart.getAll()).map(cartItem => cartItem.id))
})

cartRouter.post('/', async (request, response) => {
  const timestamp = Date.now()

  response.json({ id: await daoCart.save({ timestamp, products: [] }) })
})

cartRouter.delete('/:id', async (request, response) => {
  const id = request.params.id

  response.json(await daoCart.deleteById(id))
})

cartRouter.get('/:id/products', async (request, response) => {
  const id = request.params.id
  const cart = await daoCart.getById(id)

  response.json(cart.products)
})

cartRouter.post('/:id/products', async (request, response) => {
  const idCart = request.params.id
  const idProducts = request.body.id

  const getCart = await daoCart.getById(idCart)
  const getProducts = await daoProducts.getById(idProducts)
  getCart.products.push(getProducts)

  response.end()
})

cartRouter.delete('/:id/products/:idProd', async (request, response) => {
  const id = request.params.id
  const cart = await daoCart.getById(id)
  const index = cart.products.findIndex(prod => prod.id === request.params.idProd)

  if (index !== -1) {
    cart.products.splice(index, 1)
    await daoCart.update(cart, id)
  }

  response.end()
})

app.use(express.json)
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/products', cartRouter)

const PORT = 8080
app.listen(PORT, () => {
  try {
    console.log(`Server running on port ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
