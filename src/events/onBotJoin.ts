import { Guild } from 'discord.js'
import SQL from '../utils/SQL'

export default async function onBotJoin (guild: Guild) {

  const restrictedRole = await guild.roles.create({
    name       : 'Restricted',
    color      : 'RED',
    mentionable: false,
  })
  const basicRole      = await guild.roles.create({
    name       : 'Villager',
    color      : 'BLURPLE',
    mentionable: false,
  })
  await SQL.saveRoles(guild.id, restrictedRole.id, basicRole.id)
  console.log(await guild.rulesChannel)
}
