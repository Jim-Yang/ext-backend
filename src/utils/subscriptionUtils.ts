import { prisma } from '../db/generated/prisma-client'

export class ConnectionHandler {
  public onConnect = async (connectionParams: any, webSocket: any) => {
    // Must include a valid user id to connect to commands
    if (!connectionParams.userId) {
      throw Error('No userId provided')
    }
    const user = await prisma.user({ id: connectionParams.userId })
    if (!user) {
      throw Error('Invalid user id')
    }
    webSocket.userId = connectionParams.userId
  }

  public onDisconnect = async () => {
    // On disconnect, delete the user from db
    // await prisma.deleteUser({ id: webSocket.userId })
  }
}

export function getConnectionHandler() {
  return new ConnectionHandler()
}
