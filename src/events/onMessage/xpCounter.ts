import { Message } from 'discord.js'
import SQL from '../../utils/SQL'
import { calculateLevel, isForMe } from '../../utils/Utils'

const XP_PER_LEVEL = 5

export default async function (message: Message) {
  if (message.author.bot || isForMe(message)) return

  const authorId = message.author.id
  const guildId  = message.guildId!

  if (!await SQL.knowUser(authorId, guildId)) {
    await SQL.createUser(authorId, guildId)
  } else {
    await SQL.incrementXp(authorId, guildId)
  }

  const userXp               = await SQL.getUserXp(authorId, guildId) || 0
  const { level, remainder } = calculateLevel(userXp)
  if (remainder === 0) {
    message.channel.send(`:star2: <@${message.author.id}> is now *level ${level}* :star2:`)
  }
}
