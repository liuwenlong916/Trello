import database from './database.json'

interface IDatabaseConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql'
  timezone: string
}

const configs = {
  development: {
    server: {
      host: 'localhost',
      port: 8888,
    },
    database: database.development as IDatabaseConfig,
    jwt: {
      privateKey: 'kaikeba',
      expiresIn: '24h',
    },
    storage: {
      prefix: '/public/attachments/',
    },
  },
  test: {
    server: {
      host: 'localhost',
      port: 8888,
    },
    database: database.test as IDatabaseConfig,
    jwt: {
      privateKey: 'kaikeba',
      expiresIn: '24h',
    },
    storage: {
      prefix: '/public/attachments/',
    },
  },
  production: {
    server: {
      host: 'localhost',
      port: 8888,
    },
    database: database.production as IDatabaseConfig,
    jwt: {
      privateKey: 'kaikeba',
      expiresIn: '24h',
    },
    storage: {
      prefix: '/public/attachments/',
    },
  },
}

// type configKeys = 'development' | 'test' | 'production';
// 动态
type configKeys = keyof typeof configs

const NODE_EVN = (process.env.NODE_ENV as configKeys) || 'development'
export default configs[NODE_EVN]
