const productsApi = {
  get: () => {
    return fetch('/api/products')
      .then(data => data.json())
  },
  post: (newProd) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProd)
    }

    return fetch('/api/products', options)
  },
  put: (idProd, newProd) => {
    const options = {
      method: 'PUT',
      body: JSON.stringify(newProd),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return fetch(`/api/products/${idProd}`, options)
  },
  delete: (idProd) => {
    const options = {
      method: 'DELETE'
    }

    return fetch(`/api/products/${idProd}`, options)
  }
}

const addProductForm = document.getElementById('addProductForm')

const updateProductsList = async () => {
  const prods = await productsApi.get()
  const html = await makeHtmlTable(prods)
  document.getElementById('products').innerHTML = html
}

updateProductsList()

const reedProduct = () => {
  const producto = {
    title: addProductForm[0].value,
    descrip: addProductForm[1].value,
    price: addProductForm[2].value,
    thumbnail: addProductForm[3].value,
    stock: addProductForm[4].value
  }
  return producto
}

addProductForm.addEventListener('submit', e => {
  e.preventDefault()
  const product = reedProduct()
  productsApi.post(product)
    .then(updateProductsList)
    .then(() => {
      addProductForm.reset()
    })
    .catch((err) => {
      // eslint-disable-next-line no-undef
      alert(err.message)
    })
})

const deleteProduct = (idProd) => {
  productsApi.delete(idProd).then(updateProductsList)
}

const updateProduct = (idProd) => {
  const newProd = reedProduct()
  productsApi.put(idProd, newProd)
    .then(updateProductsList)
}

function fullForm (title = '', descrip = '', price = '', thumbnail = '', stock = '') {
  addProductForm[0].value = title
  addProductForm[1].value = descrip
  addProductForm[2].value = price
  addProductForm[3].value = thumbnail
  addProductForm[4].value = stock
}

function makeHtmlTable (products) {
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
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th>Stock</th>
                </tr>`
    for (const prod of products) {
      html += `
                    <tr>
                    <td><a type="button" onclick="${fullForm(prod.title, prod.descrip, prod.price, prod.thumbnail, prod.stock)}" title="copiar a formulario...">${prod.title}</a></td>
                    <td>${prod.descrip}</td>
                    <td>$${prod.price}</td>
                    <td><img width="50" src=${prod.thumbnail} alt="not found"></td>
                    <td>${prod.stock}</td>
                    <td><a type="button" onclick="${deleteProduct(prod.id)}"><img src="https://cdn3.iconfinder.com/data/icons/social-messaging-ui-color-line/254000/82-256.png" width="48px"> Borrar</a></td>
                    <td><a type="button" onclick="${updateProduct(prod.id)}"><img src="https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_edit-writing-content-editing-256.png" width="48px"> Editar</a></td>
                    </tr>`
    }
    html += `
            </table>
        </div >`
  }

  return Promise.resolve(html)
}
