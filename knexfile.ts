import type { Knex } from 'knex'

const config: Knex.Config = {
  client    : 'better-sqlite3',
  connection: {
    filename: './akashi.db',
  },
}

export default config
