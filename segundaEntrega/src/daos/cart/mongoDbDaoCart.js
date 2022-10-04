import MongoDbContainer from '../../containers/mongoDbContainer.js'

class MongoDbDaoCart extends MongoDbContainer {
  constructor () {
    super('cart', {
      products: { type: [], required: true }
    })
  }

  async save (cart = { products: [] }) {
    return super.save(cart)
  }
}

export default MongoDbDaoCart
