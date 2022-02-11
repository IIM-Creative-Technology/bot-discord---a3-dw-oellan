import { Message } from 'discord.js'

export abstract class BotCommand {

  abstract name: string

  abstract run (message: Message, args: string[]): Promise<void>
}
