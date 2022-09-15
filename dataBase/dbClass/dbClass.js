const { options } = require('../db/db.js')
const knex = require('knex')(options)

class Products {
  constructor (name) {
    this.tableName = name
    this.init()
  }

  async init () {
    await knex.schema.createTableIfNotExists(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.float('price')
      table.string('thumbnail')
    })
  }

  async save (object) {
    try {
      return await knex(this.tableName).insert([object])
    } catch (err) {
      return `No se pudo guardar los datos ${err}`
    }
  }

  async getById (id) {
    try {
      return await knex
        .from(this.tableName)
        .select('*')
        .where('id', id)
        .limit(1)
    } catch (err) {
      return `Error: ${err}`
    }
  }

  async getAll () {
    try {
      return await knex.from(this.tableName).select('*')
    } catch (err) {
      return `Error: ${err}`
    }
  }

  async deleteById (id) {
    try {
      return await knex.from(this.tableName).where('id', id).del()
    } catch (err) {
      return `Error: ${err}`
    }
  }

  async deleteAll () {
    try {
      return await knex.from(this.tableName).del()
    } catch (err) {
      return `Error: ${err}`
    }
  }
}

module.exports = Products
