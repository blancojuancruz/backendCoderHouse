export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'backend',
      database: 'backend'
    }
  },
  fileSystem: {
    path: './db'
  }
}
