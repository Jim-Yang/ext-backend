import { AppContext } from '../types/graphql'
import { Command } from '../types/commands'

export class MutationResolvers {
  public testSub = (_parent, { room, value }, context) => {
    context.pubSub.publish(room, { value })
    return value
  }

  public sendCommand = (_parent, args, context: AppContext) => {
    const { roomName, command, userName, userId } = args.input
    const returnCommand: Command = {
      ...command,
      sender: {
        id: userId,
        name: userName
      }
    }
    context.pubSub.publish(roomName, returnCommand)
    return returnCommand
  }

  public createUser = async (_parent, { userName }, context: AppContext) => {
    const user = await context.prisma.createUser({
      icon: 'SomeIcon',
      name: userName
    })
    return user
  }

  // Separate User and Room into different resolvers

  public createRoom = async (_parent, { roomName }, context: AppContext) => {
    const room = await context.prisma.createRoom({ name: roomName })
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
