import { Collection, Message, TextChannel } from 'discord.js'
import { BotCommand } from './BotCommand'

export default class ClearChannel extends BotCommand {
  name: string = 'clear'

  async run (message: Message, args: string[]): Promise<void> {
    const channel = message.channel
    if (!(channel instanceof TextChannel)) return

    let pastMessages: Collection<string, Message> = await channel.messages.fetch()
    do {
      channel.bulkDelete(pastMessages).then()
      pastMessages = await channel.messages.fetch()
    } while (pastMessages.size > 0)
  }
}
