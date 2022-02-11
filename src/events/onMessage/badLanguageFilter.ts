import { Message } from 'discord.js'
import LeoProfanity from 'leo-profanity-typescript'
import FrenchBadWords from '../../bridge/Profanity'

const ProfanityFilter = new LeoProfanity()
ProfanityFilter.add(FrenchBadWords)

export default function badLanguageFilter (message: Message): boolean {
  return ProfanityFilter.check(message.content)
}
