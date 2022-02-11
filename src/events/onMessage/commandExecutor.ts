import { Message } from 'discord.js'
import { BotCommand } from '../../commands/BotCommand'
import { getCommandForName } from '../../commands/index'
import { isForMe } from '../../utils/Utils'

export default async function (message: Message) {
  if (message.author.bot && !isForMe(message)) return
  if (!isForMe(message)) return

  const messageContent = message.content.trim().replace(/<@!.+>/, '').trim()
  if (messageContent.length === 0) return

  (async () => {
    const [commandName, commandArguments] = (
      (splitMessage: string[]) => {
        if (splitMessage.length == 0)
          throw new Error('No command given')
        return [splitMessage[0], splitMessage.slice(1)]
      }
    )(messageContent.split(' '))

    const command: BotCommand | null = getCommandForName(commandName.toLowerCase())

    if (command == null)
      throw new Error(`Can't find command "${commandName}"`)
    return { command, args: commandArguments }
  })()
    .then(
      async ({ command, args }) =>
        await command.run(message, args),
    ).catch(
    (error: Error) =>
      message.channel.send(error.message),
  )

}
