const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('public'))

const products = [{ name: 'Shampoo', price: 25, thumbnail: 'url.url' }]

io.on('connection', socket => {
  console.log('New User Conected')

  socket.emit('products', products)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
