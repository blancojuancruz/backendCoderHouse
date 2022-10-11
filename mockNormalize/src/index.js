import express from 'express'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import FileContainer from './models/FileContainer.js'
import config from './config.js'

import { faker } from '@faker-js/faker'

import { normalize, schema } from 'normalizr'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./views'))

const messagesApi = new FileContainer(
  `${config.fileSystem.path}/messages.json`
)

const author = new schema.Entity('authors', {}, { idAttribute: 'email' })

const message = new schema.Entity('text', {
  author
})

const post = new schema.Entity('posts', {
  messages: [message]
})

const listNormalizedMessages = async () => {
  let messages = await messagesApi.getAll()
  messages = {
    id: 'messages',
    messages
  }

  return normalize(messages, post)
}

io.on('connection', async (socket) => {
  const messages = await listNormalizedMessages()
  socket.emit('messages', messages)
  socket.on('newMessage', async (message) => {
    await messagesApi.save(message)
    message = await listNormalizedMessages()
    io.sockets.emit('messages', messages)
  })
})

const createRandom = () => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl()
  }
}

app.get('/api/products-test', (request, response) => {
  const objs = []

  for (let i = 0; i < 5; i++) {
    objs.push(createRandom())
  }

  response.json(objs)
})

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
