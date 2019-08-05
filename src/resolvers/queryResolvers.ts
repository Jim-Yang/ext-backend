import { AppContext } from '../types/graphql'

export class QueryResolvers {
  public hello = async (_parent, { name }, _context) => {
    return `Hello ${name}`
  }

  public user = async (_parent, { id }, context: AppContext) => {
    const user = context.prisma.user({ id })
    return user
  }

  public users = async (_parent, _args, context: AppContext) => {
    return context.prisma.users()
  }

  public room = async (_parent, { roomName }, context: AppContext) => {
    const room = await context.prisma.room({ name: roomName })
    return room
  }

  public rooms = async (_parent, _args, context: AppContext) => {
    const rooms = await context.prisma.rooms()
    return rooms
  }
}
