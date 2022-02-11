import { GuildMember } from 'discord.js'
import SQL from '../utils/SQL'

export default async function (member: GuildMember) {
  const { basicRoleId } = await SQL.getRolesId(member.guild!.id)
  await member.roles.add(basicRoleId)
}
