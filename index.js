const express = require('express')
const Container = require('./containerClass')
const app = express()

const products = new Container('./products.txt')
products.runFiles()

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express Server</h1>')
})

app.get('/products', (req, res) => {
  res.send(products.getAll())
})

app.get('/products/randomProduct', (req, res) => {
  res.send(products.getById(Math.floor(Math.random() * (products.id - 1 + 1) + 1)))
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
