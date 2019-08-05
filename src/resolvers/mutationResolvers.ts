import { AppContext } from '../types/graphql'
import { Command } from '../types/commands'
import { generateCombination } from 'gfycat-style-urls'

export class MutationResolvers {
  public testSub = (_parent, { room, value }, context) => {
    context.pubSub.publish(room, { value })
    return value
  }

  public sendCommand = (_parent, args, context: AppContext) => {
    const { roomName, command, userName, userId } = args.input
    const returnCommand: Command = {
      ...command,
      room: {
        name: roomName
      },
      sender: {
        id: userId,
        name: userName
      }
    }
    context.models.commands.handleCommand(returnCommand, context.prisma)
    context.pubSub.publish(roomName, returnCommand)
    return returnCommand
  }

  public createUser = async (_parent, { userName }, context: AppContext) => {
    const user = await context.prisma.createUser({
      name: userName
    })
    return user
  }

  // Separate User and Room into different resolvers

  public createRoom = async (_parent, _args, context: AppContext) => {
    let generatedRoom = generateCombination(2, '')
    while (true) {
      const findRoom = await context.prisma.room({ name: generatedRoom })
      if (!findRoom) {
        break
      }
      generatedRoom = generateCombination(2, '')
    }
    const room = await context.prisma.createRoom({
      name: generatedRoom
    })
    return room
  }

  public joinRoom = async (
    _parent,
    { userId, roomName },
    context: AppContext
  ) => {
    const room = await context.prisma.updateRoom({
      data: { users: { connect: { id: userId } } },
      where: {
        name: roomName
      }
    })
    return room
  }

  public leaveRoom = async (
    _parent,
    { userId, roomName },
    context: AppContext
  ) => {
    const room = await context.prisma.updateRoom({
      data: { users: { disconnect: { id: userId } } },
      where: {
        name: roomName
      }
    })
    return room
  }
}
