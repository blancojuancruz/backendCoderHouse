import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'
const dirname = path.resolve()
const productsWebRouter = new Router()

productsWebRouter.get('/home', webAuth, (request, response) => {
  if (request.session.name) {
    const name = request.session.name
    response.render(path.join(dirname + '/views/pages/home.ejs'), {
      name
    })
  } else {
    response.sendFile(path.join(dirname + '/views/login.html'))
  }
})

productsWebRouter.get('/products-test-view', (request, response) => {
  response.sendFile(path.join(dirname + '/views/products-test-view.html'))
})

export default productsWebRouter
