import { Command, COMMANDS } from '../types/commands'
import { Prisma, prisma } from '../db/generated/prisma-client'

export class CommandsModel {
  handleCommand(command: Command, db: Prisma) {
    if (!command.payload) {
      return
    }
    switch (command.type) {
      case COMMANDS.CHANGE_URL:
        prisma.updateRoom({
          data: { videoUrl: command.payload.url },
          where: { name: command.room.name }
        })
        console.log('CHANGE URL TO ', command.payload.url)
        return
      case COMMANDS.SEEK:
        console.log('SEEKING TO ', command.payload.seekTime)
        return
      default:
        return
    }
  }
}
