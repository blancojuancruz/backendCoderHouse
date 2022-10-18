import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import { Server as HttpServer } from 'http'
import { Server as Socket } from 'socket.io'

import authWebRouter from './routers/web/auth.js'
import productsWebRouter from './routers/web/home.js'
import productsApiRouter from './routers/api/products.js'

import addProductsHandlers from './routers/ws/products.js'
import addMessagesHandlers from './routers/ws/messages.js'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

io.on('connection', async (socket) => {
  addProductsHandlers(socket, io.sockets)
  addMessagesHandlers(socket, io.sockets)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

const URL = 'mongodb+srv://dbJB:1711Canch.@cluster0.b4nf2gp.mongodb.net/?retryWrites=true&w=majority'
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URL,
      mongoOptions: advancedOptions
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
)

app.use('', productsApiRouter)
app.use('', authWebRouter)
app.use('', productsWebRouter)

const PORT = process.env.PORT || 8080
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))
