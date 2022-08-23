const express = require('express')
const app = express()
const Product = require('./models/Product')
const handlebars = require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const products = new Product()

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs'
  })
)
app.set('views', './views')
app.set('views engine', 'hbs')

app.get('/', (request, response) => {
  const content = products.products

  return response.render('hbs/index.hbs', { content })
})

app.post('/products', (request, response) => {
  products.save(request.body)
  const content = products.products
  const listProducts = content.length !== 0

  return response.render('hbs/products.hbs', { list: content, showList: listProducts })
})

app.get('/products', (request, response) => {
  const content = products.products
  const listProducts = content.length !== 0

  return response.render('hbs/products.hbs', { list: content, showList: listProducts })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
