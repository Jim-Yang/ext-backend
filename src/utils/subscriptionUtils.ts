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
    if (!connectionParams.userId) {
      throw Error('No userId provided')
    }
    if (!connectionParams.roomName) {
      throw Error('No roomName provided')
    }

    const { userId, roomName } = connectionParams
    const user = await prisma.user({ id: userId })
    if (!user) {
      throw Error('Invalid user id')
    }
    this.pubSub.publish(roomName, this.roomMessage(user, 'joined the room'))
    webSocket.userId = userId
    webSocket.roomName = roomName
  }

  public onDisconnect = async (webSocket: any) => {
    const userId = webSocket.userId
    const user = await prisma.user({ id: userId })
    this.pubSub.publish(
      webSocket.roomName,
      this.roomMessage(user, 'left the room')
    )
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
