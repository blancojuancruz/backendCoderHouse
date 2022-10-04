const productsApi = {
  get: async () => {
    const data = await fetch('/api/products')
    return await data.json()
  }
}

const cartApi = {
  buildCart: async () => {
    const options = { method: 'POST' }
    const data = await fetch('/api/cart', options)
    return await data.json()
  },
  getIds: async () => {
    const data = await fetch('/api/cart')
    return await data.json()
  },
  postProds: (idCart, idProd) => {
    const data = { id: idProd }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }

    return fetch(`/api/cart/${idCart}/products`, options)
  },
  getProds: async (idCart) => {
    return fetch(`/api/cart/${idCart}/products`)
      .then(data => data.json())
  },
  deleteProd: (idCart, idProd) => {
    const options = {
      method: 'DELETE'
    }
    return fetch(`/api/cart/${idCart}/products/${idProd}`, options)
  }
}

const firsOption = (text) => {
  const defaultItem = document.createElement('option')
  defaultItem.value = ''
  defaultItem.text = text
  defaultItem.hidden = true
  defaultItem.disabled = true
  defaultItem.selected = true

  return defaultItem
}

const loadProds = async () => {
  const prods = await productsApi.get()
  const all = document.getElementById('prods')
  all.appendChild(firsOption('Eluja un producto'))
  for (const prod of prods) {
    const comboItem = document.createElement('option')
    comboItem.value = prod.id
    comboItem.text = prod.title

    all.appendChild(comboItem)
  }
}

const loadCart = async () => {
  const ids = await cartApi.getIds()
  const all = document.getElementById('cart')
  emptyAll(all)
  all.appendChild(firsOption('Eluja un carrito'))
  for (const id of ids) {
    const comboItem = document.createElement('option')
    comboItem.value = id
    comboItem.text = id

    all.appendChild(comboItem)
  }
}

loadCart()
loadProds()

const emptyAll = (all) => {
  while (all.childElementCount > 0) {
    all.remove(0)
  }
}

const updateCart = async (idCart) => {
  const prods = await cartApi.getProds(idCart)
  const html = makeHtmlTable(prods)
  document.getElementById('cartContainer').innerHTML = html
}

const addToCart = async (idCart, idProd) => {
  await cartApi.postProds(idCart, idProd)
  updateCart(idCart)
}

const removeProduct = async () => {
  const idCart = document.getElementById('cart').value
  const idProd = document.getElementById('prods').value
  await cartApi.deleteProd(idCart, idProd)
  updateCart(idCart)
}

const makeHtmlTable = (products) => {
  let html = `
        <style>
            .table td,
            .table th {
                vertical-align: middle;
            }
        </style>`

  if (products.length > 0) {
    html += `
        <h2>Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-dark">
                <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Foto</th>
                </tr>`
    for (const prod of products) {
      html += `
                    <tr>
                    <td>${prod.title}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td><a type="button" onclick="${removeProduct(prod.id)}">borrar</a></td>
                    </tr>`
    }
    html += `
            </table>
        </div >`
  } else {
    html += '<br><h4>carrito sin productos</h2>'
  }

  return Promise.resolve(html)
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const idCart = document.getElementById('cart').value
  const idProd = document.getElementById('prods').value
  if (idCart && idProd) {
    addToCart(idCart, idProd)
  } else {
    // eslint-disable-next-line no-undef
    alert('Debe seleccionar un carrito y un producto')
  }
})

document.getElementById('buildCartBtn').addEventListener('click', () => {
  cartApi.buildCart()
    .then(({ id }) => {
      loadCart().then(() => {
        const combo = document.getElementById('cart')
        combo.value = `${id}`
        combo.dispatchEvent(new Event('change'))
      })
    })
})

document.getElementById('cart').addEventListener('change', () => {
  const idCart = document.getElementById('cart').value
  updateCart(idCart)
})
