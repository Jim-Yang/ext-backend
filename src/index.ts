import { ApolloServer, PubSub } from 'apollo-server'
import { prisma } from './db/generated/prisma-client'
import { importSchema } from 'graphql-import'
import { createRootResolvers } from './resolvers/rootResolvers'
import { Model } from './types/graphql'
import { CommandsModel } from './models/commands'
import { ConnectionHandler } from './utils/subscriptionUtils'

const typeDefs = importSchema(`${__dirname}/schemas/schema.graphql`)

const pubSub = new PubSub()

const models: Model = {
  commands: new CommandsModel()
}

const server = new ApolloServer({
  typeDefs,
  resolvers: createRootResolvers(),
  context: {
    prisma,
    pubSub,
    models
  },
  playground: true,
  introspection: true,
  subscriptions: new ConnectionHandler(pubSub)
})

server
  .listen({ port: process.env.PORT || 4001 })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
  })
