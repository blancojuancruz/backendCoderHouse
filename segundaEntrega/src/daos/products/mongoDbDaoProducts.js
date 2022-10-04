import MongoDbContainer from '../../containers/MongoDbContainer.js'

class MongoDbDaoProducts extends MongoDbContainer {
  constructor () {
    super('products', {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      thumbnail: { type: String, required: true }
    })
  }
}

export default MongoDbDaoProducts
