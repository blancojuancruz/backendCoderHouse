// eslint-disable-next-line no-undef
const socket = io.connect()

const getTemplate = (products) => {
  return fetch('templates/productsView.hbs')
    .then(response => response.text().then(template => {
      // eslint-disable-next-line no-undef
      const html = Handlebars.compile(template)
      const allHtml = html({ products })

      return allHtml
    }))
}

socket.on('product', async products => {
  const html = await getTemplate(products)
  document.getElementById('products').innerHTML = html
})
