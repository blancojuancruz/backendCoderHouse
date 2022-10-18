import { Router } from 'express'

import path from 'path'
const dirname = path.resolve()

const authWebRouter = new Router()

let sessionName

authWebRouter.get('/', (request, response) => {
  response.send('Express server ready')
})

authWebRouter.get('/login', (request, response) => {
  if (sessionName) {
    response.send(`You are loged ${sessionName}`)
  } else {
    response.sendFile(path.join(dirname + '/views/login.html'))
  }
})

authWebRouter.get('/logout', (request, response) => {
  request.session.destroy((err) => {
    if (err) {
      response.json({ status: 'Logout error', body: err })
    } else {
      response.render(path.join(dirname + '/views/pages/logout.ejs'), {
        sessionName
      })
    }
  })
})

export default authWebRouter

authWebRouter.post('/login', (request, response) => {
  request.session.name = request.body.name
  sessionName = request.session.name

  response.redirect('/home')
})
