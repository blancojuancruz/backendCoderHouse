/* eslint-disable no-case-declarations */
let daoProducts
let daoCart
const config = 'firebase'

switch (config) {
  case 'json':
    const { default: FileDaoProducts } = await import('./products/fileDaoProducts.js')
    const { default: FileDaoCart } = await import('./cart/fileDaoCart.js')

    daoProducts = new FileDaoProducts()
    daoCart = new FileDaoCart()
    break
  case 'firebase':
    const { default: FirebaseDaoProducts } = await import('./products/firebaseDaoProducts.js')
    const { default: FirebaseDaoCart } = await import('./cart/firebaseDaoCart.js')

    daoProducts = new FirebaseDaoProducts()
    daoCart = new FirebaseDaoCart()
    break
  case 'mongodb':
    const { default: MongoDbDaoProducts } = await import('./products/mongoDbDaoProducts.js')
    const { default: MongoDbDaoCart } = await import('./cart/mongoDbDaoProducts.js')

    daoProducts = new MongoDbDaoProducts()
    daoCart = new MongoDbDaoCart()
    break
  default:
    break
}

export { daoProducts, daoCart }
