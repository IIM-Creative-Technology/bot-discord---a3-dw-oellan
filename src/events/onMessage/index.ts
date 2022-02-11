import type { Message } from 'discord.js'
import badLanguageFilter from './badLanguageFilter'
import commandExecutor from './commandExecutor'
import xpCounter from './xpCounter'

export default async function onMessage (message: Message) {
  if (badLanguageFilter(message)) {
    const guild  = message.guild!
    const client = message.client!

    await Promise.all([
      message.delete(), // Delete message
      client.users.send(
        message.author,
        `You have been banned from ${guild.name} for bad language`,
      ), // Send DM warning
    ])
      .then(() => {
        return guild.members.fetch(message.author)
          .then(
            (member) =>
              member.kick('Bad language'),
          ) // Kick from guild
      })
  } else {
    await continueProcessMessage(message)
  }
}

async function continueProcessMessage (message: Message) {
  return await Promise.all([
    commandExecutor(message),
    xpCounter(message),
  ])
}
