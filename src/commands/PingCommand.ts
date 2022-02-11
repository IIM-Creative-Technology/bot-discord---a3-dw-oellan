import { Message } from 'discord.js'
import SQL from '../utils/SQL'
import { BotCommand } from './BotCommand'

export default class PingCommand extends BotCommand {
  name: string = 'ping'

  async run (message: Message, args: string[]): Promise<void> {
    const {} = await SQL.getRolesId(message.guildId!)
  }
}
