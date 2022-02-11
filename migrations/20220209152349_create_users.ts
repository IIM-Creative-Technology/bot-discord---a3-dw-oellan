import { Knex } from 'knex'

// noinspection JSUnusedGlobalSymbols
export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'users',
    (tableBuilder) => {
      tableBuilder.bigIncrements('id')
        .notNullable()
        .primary()
        .unsigned()
      tableBuilder.string('userId', 18)
        .notNullable()
      tableBuilder.string('guildId')
        .notNullable()
      tableBuilder.bigInteger('xp')
        .unsigned()
        .defaultTo(0)
    },
  )
}

// noinspection JSUnusedGlobalSymbols
export async function down (knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

