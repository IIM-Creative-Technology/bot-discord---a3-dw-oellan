import { Guild } from 'discord.js'
import SQL from '../utils/SQL'

export default async function onBotQuit (guild: Guild) {
  await SQL.destroyGuild(guild.id)
}
