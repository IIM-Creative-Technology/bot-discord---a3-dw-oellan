import knex from 'knex'
import knexConfig from '../../knexfile'

const connection = knex(knexConfig)

function peek<T> (arg: T): T {
  console.log(arg)
  return arg
}

async function knowUser (userId: string, guildId: string): Promise<boolean> {
  return connection.count()
    .from('users')
    .where('userId', '=', userId)
    .andWhere('guildId', '=', guildId)
    .first()
    .then(value => value!['count(*)'] !== 0)
}

async function createUser (userId: string, guildId: string): Promise<void> {
  return connection('users')
    .insert({ userId, guildId, xp: 1 })
    .then()
}

async function incrementXp (userId: string, guildId: string): Promise<void> {
  return connection('users')
    .increment('xp', 1)
    .where('userId', '=', userId)
    .andWhere('guildId', '=', guildId)
    .then()
}

async function getUserXp (userId: string, guildId: string): Promise<number | null> {
  return connection('users')
    .select('xp')
    .where('userId', '=', userId)
    .andWhere('guildId', '=', guildId)
    .first()
    .then(
      (result) =>
        result ? result.xp : null)
}

async function saveRoles (guildId: string, restrictedId: string, basicRoleId: string) {
  return connection('roles')
    .insert({ guildId, restrictedId, basicRoleId })
    .then()
}

async function getRolesId (guildId: string): Promise<{ restrictedId: string, basicRoleId: string }> {
  return connection('roles')
    .select(['restrictedId', 'basicRoleId'])
    .where('guildId', '=', guildId)
    .first()
    .then((value) => value)
}

async function destroyGuild (guildId: string) {
  await Promise.all([
    connection('roles')
      .delete()
      .where('guildId', '=', guildId)
      .then(),
    connection('users')
      .delete()
      .where('guildId', '=', guildId)
      .then(),
  ])
}

export default {
  knowUser,
  createUser,
  incrementXp,
  getUserXp,
  saveRoles,
  getRolesId,
  destroyGuild,
}
