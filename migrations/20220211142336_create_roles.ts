import { Knex } from 'knex'

export async function up (knex: Knex): Promise<void> {
  return knex.schema.createTable(
    'roles',
    (tableBuilder) => {
      tableBuilder.bigIncrements('id')
        .notNullable()
        .primary()
        .unsigned()
      tableBuilder.string('guildId')
        .notNullable()
        .unique()
      tableBuilder.string('restrictedId')
        .notNullable()
      tableBuilder.string('basicRoleId')
        .notNullable()
    })
}

export async function down (knex: Knex): Promise<void> {
  knex.schema.dropTable('guildRoles')
}

