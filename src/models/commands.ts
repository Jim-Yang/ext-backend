import { Command, COMMANDS } from '../types/commands'
import { Prisma } from '../db/generated/prisma-client'

export class CommandsModel {
  public async handleCommand(command: Command, db: Prisma) {
    if (!command.payload) {
      return
    }
    switch (command.type) {
      case COMMANDS.CHANGE_URL:
        await db.updateRoom({
          data: { videoUrl: command.payload.url },
          where: { name: command.room.name }
        })
        return
      case COMMANDS.SEEK:
        await db.updateRoom({
          data: { seekTime: command.payload.seekTime },
          where: { name: command.room.name }
        })
        return
      default:
        return
    }
  }
}
