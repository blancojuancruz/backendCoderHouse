const express = require('express')
const { Router } = express
const Product = require('./dbClass/dbClass')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')

const app = express()
const httpServer = new HttpServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views/layouts'))

const prods = new Product('products')
const router = Router()

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    // eslint-disable-next-line n/no-path-concat
    partialsDir: __dirname + '/views/partials'
  })
)
app.set('views', './views')
app.set('views engine', 'hbs')

router.get('/', async (request, response) => {
  const res = await prods.getAll()

  return response.send(JSON.stringify(res))
})

router.get('/:id', async (request, response) => {
  const id = Number(request.params.id)
  const res = await prods.getById(id)

  return response.send(JSON.stringify(res))
})

router.post('/', async (request, response) => {
  const product = request.body
  const res = await prods.save(product)

  return response.send(JSON.stringify(res))
})

router.delete('/:id', async (request, response) => {
  const id = Number(request.params.id)
  const res = await prods.deleteById(id)

  return response.send(JSON.stringify(res))
})

app.use('/api/products', router)

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
