import FileContainer from '../../containers/FileContainer.js'

class FileDaoCart extends FileContainer {
  constructor () {
    super('cart.json')
  }

  async save (cart = { products: [] }) {
    return super.save(cart)
  }
}

export default FileDaoCart
