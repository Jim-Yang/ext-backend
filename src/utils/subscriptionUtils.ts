import { prisma } from '../db/generated/prisma-client'
import { PubSub } from 'apollo-server'
import { Command, COMMANDS } from '../types/commands'
import { User } from '../types/data'
import { ConnectionParams } from 'subscriptions-transport-ws'

export class ConnectionHandler {
  private pubSub: PubSub
  constructor(pubSub: PubSub) {
    this.pubSub = pubSub
  }
  public onConnect = async (
    connectionParams: ConnectionParams,
    webSocket: any
  ) => {
    const { userId, roomName } = connectionParams
    if (!userId) {
      throw Error('No userId provided')
    }
    if (!roomName) {
      throw Error('No roomName provided')
    }
    const user = await prisma.user({ id: userId })
    if (!user) {
      throw Error('Invalid user id')
    }
    this.pubSub.publish(roomName, this.roomMessage(user, 'joined the room'))
    webSocket.userId = userId
    webSocket.roomName = roomName
  }

  public onDisconnect = async (webSocket: any) => {
    const { userId, roomName } = webSocket
    /**
     * This code runs over and over again for some reason.
     * If it does not contain userId then do nothing, or else it will complain
     */
    if (!userId) {
      return
    }
    const user = await prisma.user({ id: userId })
    this.pubSub.publish(roomName, this.roomMessage(user, 'left the room'))
  }

  private roomMessage(user: User, message: string): Command {
    return {
      type: COMMANDS.SEND_MESSAGE,
      payload: {
        message: `${user.name} ${message}`
      },
      sender: user
    }
  }
}
