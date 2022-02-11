import axios from 'axios'
import { Message, MessageEmbed } from 'discord.js'
import { BotCommand } from './BotCommand'

const NEKOS_API = 'https://nekos.best/api/v1/nekos'

export default class NekoCommand extends BotCommand {

  name: string = 'neko'

  async run (message: Message, args: string[]): Promise<void> {
    axios.get(NEKOS_API).then(
      (response) =>
        response.data,
    ).then((data: NekoData) => {
      const nekoEmbed = new MessageEmbed({
        author: {
          name: `Made by ${data.artist_name}`,
          url : data.artist_href,
        },
        image : {
          url: data.url,
        },
      })
      message.channel.send({ embeds: [nekoEmbed] })
    })
  }
}

interface NekoData {
  source_url: string,
  artist_href: string,
  artist_name: string,
  url: string
}
