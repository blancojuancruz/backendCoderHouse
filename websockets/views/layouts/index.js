let username = sessionStorage.getItem('username')
const chat = document.getElementById('chat')
if (!username) {
  username = prompt('UserName')
}

$('#username').html(username)

// eslint-disable-next-line no-undef
const socket = io.connect()

function render (data) {
  data.forEach((info) => {
    $('#messages').prepend(`
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

chat.addEventListener('submit', (e) => {
  e.preventDefault()

  const message = {
    author: username,
    text: $('#text').val()
  }

  socket.emit('new-message', message)
})
