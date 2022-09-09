const { promises: fs } = require('fs')

class FileContainer {
  constructor (route) {
    this.route = route
  }

  async list (id) {
    const elements = await this.listAll()
    const element = elements.find(elementItem => elementItem.id === id)
    return element
  }

  async listAll () {
    try {
      const elements = await fs.readFile(this.route, 'utf-8')
      return JSON.parse(elements)
    } catch (err) {
      return []
    }
  }

  async save (element) {
    const elements = await this.listAll()
    let id = 0
    const length = elements.length
    if (length > 0) {
      id = (parseInt(elements[length - 1].id) + 1).toString()
    } else {
      id = '1'
    }
    element.id = id
    element.timestamp = Date.now()
    elements.push(element)
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  async include (element, id) {
    const elements = await this.listAll()
    const index = elements.map(elementItem => elementItem.id).indexOf(id)
    const container = elements[index]
    const products = container.products
    if (products) {
      products.push(element)
    } else {
      container.products = [element]
    }
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  async update (element, id) {
    const elements = await this.listAll()
    const index = elements.map(elementItem => elementItem.id).indexOf(id)
    if (index !== -1) {
      element.id = id
      elements[index] = element
    }
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  async deleteById (id) {
    let elements = await this.listAll()
    elements = elements.filter(element => element.id !== id)
    console.log(`\nThe element with id: ${id} have been removed\n`)
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  async deleteAll () {
    const elements = []
    console.log('nThe elements have been removed\n')
    await fs.writeFile(this.route, JSON.stringify(elements))
  }

  async removeById (id, idElement) {
    const elements = await this.listAll()
    const index = elements.map(elementItem => elementItem.id).indexOf(id)
    const container = elements[index]
    container.products = container.products.filter(element => element.id !== idElement)
    await fs.writeFile(this.route, JSON.stringify(elements))
  }
}

module.exports = FileContainer
