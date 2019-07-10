import { ApolloServer, PubSub } from 'apollo-server'
import { prisma } from './../db/generated/prisma-client'
import { importSchema } from 'graphql-import'
import { createRootResolvers } from './resolvers/rootResolvers';


const typeDefs = importSchema(`${__dirname}/schemas/schema.graphql`)

const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers: createRootResolvers(),
  context: {
    prisma,
    pubSub
  },
  playground: true
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});