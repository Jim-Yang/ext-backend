import { ApolloServer, PubSub } from 'apollo-server'
import { prisma, Prisma } from './../db/generated/prisma-client'

const typeDefs = `
  type Mutation {
    testSub(room: String, value: String): String
  }

  type Subscription {
    testSub(room: String): String
  }

  type User {
    id: String!
    name: String!
  }

  type Query {
    hello(name: String): String
    users: [User]
  }
`

const pubSub = new PubSub();

const resolvers = {
  Query: {
    hello: (_parent, { name }, _context) => {
      const returnValue = `Hello ${name || 'World!'}`
      return returnValue
    },
    users: (_parent, _args, context) => {
      const client: Prisma = context.prisma;
      return client.users()
    }
  },
  Subscription: {
    testSub: {
      resolve: (payload, args, context) => {
        console.log(payload)
        return payload
      },
      subscribe: (_parent, { room }, _context) => {
        return pubSub.asyncIterator(room)
      }
    } 
  },
  Mutation: {
    testSub: (_parent, { room, value }, _context) => {
      pubSub.publish(room, {value})
      return value
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});