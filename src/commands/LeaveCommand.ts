import { Message } from 'discord.js'
import SQL from '../utils/SQL'
import { BotCommand } from './BotCommand'

export default class extends BotCommand {

  name: string = 'leave'

  async run (message: Message, args: string[]): Promise<void> {
    const { restrictedId, basicRoleId } = await SQL.getRolesId(message.guildId!)
    await Promise.all([
      message.guild!.roles!.delete(restrictedId),
      message.guild!.roles!.delete(basicRoleId),
    ])
    message.channel.send(`${message.guild!.me!.toString()} will leave you.`)
    return message.guild!.leave().then()
  }

}
