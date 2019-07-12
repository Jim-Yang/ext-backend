import { Prisma } from '../db/generated/prisma-client'
import { PubSub } from 'apollo-server'
import { CommandsModel } from '../models/commands'

export interface AppContext {
  prisma: Prisma
  pubSub: PubSub
  models: Model
}

export interface Model {
  commands: CommandsModel
}
