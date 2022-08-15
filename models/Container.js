const fs = require('fs')

class Container {
  constructor (fileName) {
    this.fileName = fileName
    this.id = 0
    this.products = []
  }

  writeFiles = async () => {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(this.products))
    } catch (err) {
      console.log(`${err}: No se pudo completar la operacion`)
    }
  }

  save = (product) => {
    this.id++
    product.id = this.id
    this.products.push(product)
    this.writeFiles()

    return this.id
  }

  getById = (id) => {
    const product = this.products.find(product => product.id === id)
    return product || 'Not found'
  }

  getAll = () => {
    return this.products
  }

  deleteById = (id) => {
    try {
      let result
      if (this.products !== []) {
        const newProductsList = this.products.filter(product => product.id !== id)
        this.products = newProductsList
        this.writeFiles()
        result = 'Producto eliminado correctamente'
      } else {
        result = 'Empty file'
      }

      return result
    } catch (err) {
      console.log(`${err}: No se pudo elimiar el producto`)
    }
  }

  deleteAll = () => {
    try {
      this.products = []
      this.writeFiles()

      console.log('Lista eliminada')
    } catch (err) {
      console.log(`${err}: No se pudo elimiar la lista`)
    }
  }

  runFiles = async () => {
    try {
      const data = await fs.promises.readFile(this.fileName, 'utf-8')
      this.products = JSON.parse(data)

      this.products.forEach(product => {
        if (product.id > this.id) this.id = product.id
      })
    } catch (err) {
      console.log(`${err}: No products in the DataBase`)
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

module.exports = Container
