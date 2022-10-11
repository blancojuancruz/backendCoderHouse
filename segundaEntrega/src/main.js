import express from 'express'
import {
  daoProducts, daoCart
} from './daos/index.js'
const { Router } = express

const app = express()

const productsRouter = new Router()
const cartRouter = new Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views'))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

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

productsRouter.get('/', async (request, response) => {
  const prods = await daoProducts.getAll()

  response.json(prods)
})

productsRouter.get('/', async (request, response) => {
  if (Object.entries(request.query).length > 0) {
    const id = request.query.id
    response.json(await daoProducts.getById(id))
  } else {
    response.json(await daoProducts.getAll())
  }
})

productsRouter.post('/', isAutenticated, async (request, response) => {
  const body = request.body

  response.json(await daoProducts.save(body))
})

productsRouter.put('/:id', isAutenticated, async (request, response) => {
  const id = request.params.id
  const body = request.body
  await daoProducts.update(body, id)

  response.json(await daoProducts.getById(id))
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

const PORT = 8080
app.listen(PORT, () => {
  try {
    console.log(`Server running on port ${PORT}`)
  } catch (error) {
    console.log(error)
  }
})
