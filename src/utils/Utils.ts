import type { Message } from 'discord.js'

export function isForMe (message: Message): boolean {
  const messageContent = message.content.trim()
  const botMention     = `<@!${message.client.user!.id}>`
  return messageContent.startsWith(botMention)
}

export const XP_PER_LEVEL = 5

export function calculateLevel (xp: number): { level: number, remainder: number } {
  const remainder = xp % XP_PER_LEVEL
  const level     = (xp - remainder) / XP_PER_LEVEL + 1
  return { level, remainder }
}
