// eslint-disable-next-line no-undef
const socket = io.connect()

const render = (data) => {
  data.forEach((info) => {
    document.getElementById('messages').append(`
      <div>
          <em class="text-primary fw-bold">${info.author}</em>
          [<em class="text-danger">${info.time}</em>]: <em class="text-success fst-italic">${info.text}</em>
      </div>
    `)
  })
}

socket.on('messages', (data) => {
  console.log(data)
  render(data)
})

document.getElementById('#myChat').on('submit', (e) => {
  e.preventDefault()

  const message = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value
  }

  socket.emit('new-message', message)
})
