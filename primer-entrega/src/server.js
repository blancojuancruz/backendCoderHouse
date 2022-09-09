const express = require('express')
const { Router } = express

const FileContainer = require('./containers/FileContainer.js')

const app = express()

const productsApi = new FileContainer('dbProducts.json')
const cartsApi = new FileContainer('dbCarts.json')

const isAdmin = true

function noAdminErr (path, method) {
  const err = {
    err: -1
  }
  if (path && method) {
    err.description = `path '${path}' method '${method}' no autorizado`
  } else {
    err.description = 'no autorizado'
  }
  return err
}

function onlyAdmins (req, res, next) {
  if (!isAdmin) {
    res.json(noAdminErr())
  } else {
    next()
  }
}

const productsRouter = new Router()

productsRouter.get('/', async (req, res) => {
  console.log('HTTP GET')
  if (Object.entries(req.query).length > 0) {
    const id = req.query.id
    res.json(await productsApi.list(id))
  } else {
    res.json(await productsApi.listAll())
  }
})

productsRouter.post('/', onlyAdmins, async (req, res) => {
  console.log('HTTP POST')
  res.json(await productsApi.save(req.body))
})

productsRouter.put('/:id', onlyAdmins, async (req, res) => {
  console.log('HTTP PUT')
  const id = req.params.id
  await productsApi.update(req.body, id)
  res.json(await productsApi.list(id))
})

productsRouter.delete('/:id', onlyAdmins, async (req, res) => {
  console.log('HTTP DELETE')
  const id = req.params.id
  res.json(await productsApi.deleteById(id))
})

const cartsRouter = new Router()

cartsRouter.post('/', onlyAdmins, async (req, res) => {
  console.log('HTTP POST')
  res.json(await cartsApi.save(req.body))
})

cartsRouter.delete('/:id', onlyAdmins, async (req, res) => {
  console.log('HTTP DELETE')
  const id = req.params.id
  res.json(await cartsApi.deleteById(id))
})

cartsRouter.get('/:id/products', async (req, res) => {
  console.log('HTTP GET')
  const id = req.params.id
  const cart = await cartsApi.list(id)
  res.json(cart.products)
})

cartsRouter.post('/:id/products', onlyAdmins, async (req, res) => {
  console.log('HTTP POST')
  const id = req.params.id
  res.json(await cartsApi.include(req.body, id))
})

cartsRouter.delete('/:id/products/:id_prod', onlyAdmins, async (req, res) => {
  console.log('HTTP DELETE')
  const id = req.params.id
  const idElement = req.params.id_prod
  res.json(await cartsApi.removeById(id, idElement))
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)

module.exports = app
