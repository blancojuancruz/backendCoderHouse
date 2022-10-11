import admin from 'firebase-admin'
import config from '../config.js'

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
})

const db = admin.firestore()

class FirebaseContainer {
  constructor (collName) {
    this.collection = db.collection(collName)
    this.id = 0
  }

  async getById (id) {
    try {
      const doc = this.collection.doc(id)
      const item = await doc.get()
      const res = item.data()

      return res
    } catch (err) {
      console.log(err)
    }
  }

  async getAll () {
    try {
      const result = []
      const snapshot = await this.collection.get()
      snapshot.forEach((doc) => {
        const data = doc.data()
        result.push({ ...data, id: doc.id })
      })

      return result
    } catch (error) {
      console.log(error)
      throw new Error(`Error al obtener los documentos: ${error}`)
    }
  }

  async save (data) {
    try {
      const doc = await this.collection.add(data)

      return { ...data, id: doc.id }
    } catch (error) {
      throw new Error(`Error al guardar el documento: ${error}`)
    }
  }

  async update (element, id) {
    const { title, price, thumbnail } = element
    const timestamp = Date.now()

    try {
      const doc = this.collection.doc(id)

      await doc.set({ title, price, thumbnail, timestamp })
    } catch (error) {
      throw new Error(`Error al actualizar el documento: ${error}`)
    }
  }

  async delete (id) {
    try {
      const item = await this.collection.doc(id).delete()

      return item
    } catch (error) {
      throw new Error(`Error al borrar el documento: ${error}`)
    }
  }

  async deleteById () {
    try {
      const snapshot = await this.collection.get()
      snapshot.forEach((doc) => {
        doc.ref.delete()
      })
    } catch (error) {
      throw new Error(`Error al borrar los documentos: ${error}`)
    }
  }
}

export default FirebaseContainer
