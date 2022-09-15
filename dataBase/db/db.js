const options = {
  client: 'sqlite3',
  connection: {
    filename: './mydb.sqlite',
    host: '127.0.0.1',
    database: 'Ecommerce'
  }
}

module.exports = { options }
