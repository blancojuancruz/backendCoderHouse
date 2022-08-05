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

  save = (object) => {
    try {
      this.id++
      object.id = this.id
      this.products.push(object)
      this.writeFiles()

      return this.id
    } catch (err) {
      console.log(`${err}: El objeto no pudo ser guardado correctamente`)
    }
  }

  getById = (id) => {
    try {
      let result
      if (this.products !== []) {
        result = this.products.find(product => product.id === id)
        if (result === undefined) {
          result = null
        }
      } else {
        result = this.id
      }

      return result
    } catch (err) {
      console.log(`${err}: No se encontro el Id solicitado`)
    }
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
}

module.exports = Container
