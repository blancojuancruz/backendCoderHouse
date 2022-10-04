import mongoose from 'mongoose'
import config from '../config.js'
import { asObj, removeField, renameField } from '../utils/utils'

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

class MongoDbContainer {
  constructor (collName, schema) {
    this.coleccion = mongoose.model(collName, schema)
  }

  async getById (id) {
    try {
      const docs = await this.coleccion.find({ _id: id }, { __v: 0 })

      if (docs.length === 0) {
        throw new Error(`No existe el documento con id ${id}`)
      } else {
        const result = renameField(asObj(docs[0]), '_id', 'id')

        return result
      }
    } catch (error) {
      throw new Error(`Error al listar el documento con id ${id}: ${error}`)
    }
  }

  async getAll () {
    try {
      const docs = await this.coleccion.find({}, { __v: 0 })
      const result = docs.map(doc => renameField(asObj(doc), '_id', 'id'))

      return result
    } catch (error) {
      throw new Error(`Error al listar los documentos: ${error}`)
    }
  }

  async save (newItem) {
    const elements = await this.getAll()
    let id
    const length = elements.length
    if (length > 0) {
      id = elements.map(elem => parseInt(elem.id))
      id.sort((a, b) => b - a)
      id = (id[0] + 1).toString()
    } else {
      id = '1'
    }
    newItem.id = id
    newItem.timestamp = Date.now()
    await this.coll.create(newItem)
  }

  async update (newItem) {
    try {
      const id = Object.id
      const doc = removeField(newItem, 'id')
      const result = await this.coleccion.updateOne({ _id: id }, doc)
      if (result.n === 0) {
        throw new Error(`No existe el documento con id ${id}`)
      } else {
        return id
      }
    } catch (error) {
      throw new Error(`Error al actualizar el documento: ${error}`)
    }
  }

  async deleteById (id) {
    try {
      const result = await this.coleccion.deleteOne({ _id: id })
      if (result.n === 0) {
        throw new Error(`No existe el documento con id ${id}`)
      } else {
        return id
      }
    } catch (error) {
      throw new Error(`Error al borrar el documento con id ${id}: ${error}`)
    }
  }

  async deleteAll () {
    try {
      const result = await this.coleccion.deleteMany({})
      return result
    } catch (error) {
      throw new Error(`Error al borrar los documentos: ${error}`)
    }
  }
}

export default MongoDbContainer
