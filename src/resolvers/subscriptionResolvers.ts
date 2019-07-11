import { Command } from "../types/commands";

export class SubscriptionResolvers {
    public commands = {
        resolve: (payload: Command) => {
            return payload
        },
        subscribe: (_parent, { roomName }, context) => {
            return context.pubSub.asyncIterator(roomName)
        }
    }
}
