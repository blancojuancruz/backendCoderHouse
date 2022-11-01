import parseArgs from 'minimist'
import dotenv from 'dotenv'
dotenv.config()

const options = {
  default: { port: process.env.PORT },
  alias: { p: 'port' }
}

export default {
  sqlite3: {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITE3
    },
    useNullAsDefault: true
  },
  mariaDb: {
    client: 'mysql',
    connection: {
      host: process.env.MARIADB_HOST,
      user: process.env.MARIADB_USER,
      password: '',
      database: process.env.MARIADB_DATABASE
    }
  },
  fileSystem: {
    path: process.env.FILESYSTEM_PATH
  },
  mongoDb: {
    mongoDbUrl: process.env.MONGODB_DATA_BASE_URL,
    mongoDbExpiration: process.env.MONGODB_EXPIRATION
  },
  port: parseArgs(process.argv.slice(2), options)
}
