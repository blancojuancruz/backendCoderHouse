const express = require('express')
const Product = require('./models/Product')
const app = express()
const { Router } = express
const productsRouter = Router()
const handleError = require('./middlewares/handleError')
const notFound = require('./middlewares/notFound')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use('/api/products/', productsRouter)

const products = new Product()

productsRouter.get('/', (request, response) => {
  return response.status(200).json(products.getAll())
})

productsRouter.get('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  try {
    response.status(200).json(products.getById(id))
  } catch (error) {
    next(error)
  }
})

productsRouter.post('/', (request, response) => {
  const { title, price, thumbnail } = request.body
  const newProduct = { title, price, thumbnail }
  products.save(newProduct)

  response.status(201).json({ Status: 'Product added successfully' }) || response.status(400).json({ Status: 'Product could not be created' })
})

productsRouter.put('/:id', (request, response, next) => {
  const id = Number(request.params.id)
  const product = request.body

  try {
    response.status(200).json(products.updateProduct(id, product))
  } catch (error) {
    next(error)
  }
})

productsRouter.delete('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  try {
    response.status(204).json(products.deleteById(id))
  } catch (error) {
    next(error)
  }
})

app.use(handleError)
app.use(notFound)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
