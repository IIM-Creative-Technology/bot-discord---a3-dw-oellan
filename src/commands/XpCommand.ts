import { Message, MessageEmbed } from 'discord.js'
import SQL from '../utils/SQL'
import { calculateLevel, XP_PER_LEVEL } from '../utils/Utils'
import { BotCommand } from './BotCommand'

export default class XpCommand extends BotCommand {
  name: string = 'xp'

  async run (message: Message, args: string[]): Promise<void> {
    if (args.length > 0) throw new Error('Too much arguments')

    let userXp = await SQL.getUserXp(message.author.id, message.guildId!)
    console.log(userXp)
    if (userXp == null) {
      await SQL.createUser(message.author.id, message.guildId!)
      userXp = 1
    }
    const { level, remainder } = calculateLevel(userXp)
    const xpEmbed              = new MessageEmbed({
      author: {
        name    : message.author.username,
        icon_url: message.author.avatarURL() || message.author.defaultAvatarURL,
      },
      fields: [
        {
          name  : 'Level',
          value : `${level}`,
          inline: true,
        }, {
          name  : 'XP',
          value : `${remainder}/${XP_PER_LEVEL}`,
          inline: true,
        },
      ],
    })
    message.channel.send({ embeds: [xpEmbed] })
  }
}
