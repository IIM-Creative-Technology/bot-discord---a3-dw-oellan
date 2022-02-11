import { Client as DiscordClient } from 'discord.js'
import { ActivityTypes } from 'discord.js/typings/enums'
import 'dotenv/config'
import onBotJoin from './events/onBotJoin'
import onBotQuit from './events/onBotQuit'
import onMessage from './events/onMessage/index'
import onUserJoin from './events/onUserJoin'
import './utils/SQL'

const discordClient = new DiscordClient({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
  ],
})

discordClient.on(
  'ready',
  () => {
    console.log(`Invite the bot with this URL: ${discordClient.generateInvite({
      scopes     : ['bot'],
      permissions: [
        'MANAGE_ROLES',
        'MANAGE_MESSAGES',
        'KICK_MEMBERS',
      ],
    })}`)
    discordClient.user!.setActivity({
      type: ActivityTypes.LISTENING,
      name: 'your summons',
    })
  },
)

discordClient.on('messageCreate', (message) => onMessage(message))
discordClient.on('guildMemberAdd', (member) => onUserJoin(member))
discordClient.on('guildCreate', (guild) => onBotJoin(guild))
discordClient.on('guildDelete', (guild) => onBotQuit(guild))

discordClient.login(process.env.TOKEN)
  .catch(
    (error) =>
      console.error(error),
  )
