import { Command } from '../types/commands'
import { AppContext } from '../types/graphql'

export class SubscriptionResolvers {
  public commands = {
    resolve: (payload: Command) => {
      return payload
    },
    subscribe: async (_parent, { roomName }, context: AppContext) => {
      const room = await context.prisma.room({ name: roomName })
      if (!room) {
        throw Error('Invalid room')
      }
      return context.pubSub.asyncIterator(roomName)
    }
  }
}
