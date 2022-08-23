class Product {
  constructor () {
    this.id = 0
    this.products = []
  }

  save = (product) => {
    this.id++
    product.id = this.id
    this.products.push(product)

    return this.id
  }

  getById = (id) => {
    const product = this.products.find(product => product.id === id)
    return product
  }

  getAll = () => {
    return this.products
  }

  deleteById = (id) => {
    if (this.products !== []) {
      const newProductsList = this.products.filter(product => product.id !== id)
      this.products = newProductsList
    }
  }

  updateProduct = (id, product) => {
    const editProduct = this.products.map(product => product.id).indexOf(id)

    if (editProduct !== -1) {
      this.products[editProduct].title = product.title
      this.products[editProduct].price = product.price
      this.products[editProduct].thumbnail = product.thumbnail
    }
  }
}

module.exports = Product
