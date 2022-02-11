import { BotCommand } from './BotCommand'
import ClearChannel from './ClearChannel'
import LeaveCommand from './LeaveCommand'
import NekoCommand from './NekoCommand'
import PingCommand from './PingCommand'
import XpCommand from './XpCommand'

const Commands: BotCommand[] = [
  new PingCommand,
  new NekoCommand,
  new ClearChannel,
  new LeaveCommand,
  new XpCommand,
]

export function getCommandForName (commandName: string): BotCommand | null {
  return Commands.find(({ name }) => name.toLowerCase() === commandName) ?? null
}
