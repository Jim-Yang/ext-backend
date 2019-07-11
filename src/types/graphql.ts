import { Prisma } from '../db/generated/prisma-client'
import { PubSub } from 'apollo-server'

export type AppContext = {
  prisma: Prisma
  pubSub: PubSub
}
