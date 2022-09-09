const express = require('express')
const Product = require('../models/Product')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views/layouts'))

const listProducts = new Product()
const messages = []

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

app.get('/', (req, response) => {
  const content = listProducts.products
  const getAllProducts = content.length !== 0

  return response.render('layouts/main.hbs', {
    list: content,
    showList: getAllProducts
  })
})

app.post('/', (request, response) => {
  listProducts.save(request.body)

  const content = listProducts.products
  const getAllProducts = content.length !== 0

  return response.render('layouts/main.hbs', { list: content, showList: getAllProducts })
})

io.on('connection', (socket) => {
  socket.emit('messages', messages)

  socket.on('new-message', (data) => {
    data.time = new Date().toLocaleString()
    messages.push(data)
    io.sockets.emit('messages', [data])
  })
})

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
