const express = require('express')
const Container = require('./models/Container')
const app = express()
const { Router } = express
const productsRouter = Router()
const handleError = require('./middlewares/handleError')
const usersRouter = require('./controllers/users')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(express.static('public'))
app.use('/api/products/', productsRouter)

const products = new Container('./data/products.json')
products.runFiles()

productsRouter.get('/', (request, response) => {
  response.json(products.products)
})

app.get('/api/products/:id', (request, response, next) => {
  const id = Number(request.params.id)
  const product = request.body

  try {
    product ? response.json(products.getById(id)) : response.status(404).end()
  } catch (error) {
    next(error)
  }
})

productsRouter.post('/', (request, response) => {
  const newProduct = request.body

  response.json(products.save(newProduct))
})

productsRouter.put('/:id', (request, response) => {
  const id = Number(request.params.id)
  const product = request.body

  response.json(products.updateProduct(id, product))
})

productsRouter.delete('/:id', (request, response, next) => {
  const id = Number(request.params.id)

  try {
    response.json(products.deleteById(id)).status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use(handleError)
app.use(usersRouter)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
