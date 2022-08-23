const express = require('express')
const Product = require('./models/Product')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', './views/pug')
app.set('views engine', 'pug')

const products = new Product()

app.get('/', (request, response) => {
  const content = products.products

  return response.render('index.pug', { content })
})

app.post('/products', (request, response) => {
  products.save(request.body)
  const content = products.products

  return response.render('products.pug', { content })
})

app.get('/products', (request, response) => {
  const content = products.products

  return response.render('products.pug', { content })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
