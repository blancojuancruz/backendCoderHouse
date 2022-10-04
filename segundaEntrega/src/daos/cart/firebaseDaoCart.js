import FirebaseContainer from '../../containers/FirebaseContainer.js'

class FirebaseDaoCart extends FirebaseContainer {
  constructor () {
    super('cart')
  }

  async save (cart) {
    cart.products = []
    return super.save(cart)
  }
}

export default FirebaseDaoCart
