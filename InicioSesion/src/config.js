export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'coderhouse'
    }
  },
  fileSystem: {
    path: './dataBase'
  },
  mongoDb: {
    DATA_BASE_URL: 'mongodb+srv://dbJB:1711Canch.@cluster0.b4nf2gp.mongodb.net/?retryWrites=true&w=majority',
    EXPIRATION_TIME: 600000
  }
}
