import { Commands } from "../types/commands";

export class SubscriptionResolvers {
    public commands = {
        resolve: (payload: Commands) => {
            return payload
        },
        subscribe: (_parent, { roomName }, context) => {
            return context.pubSub.asyncIterator(roomName)
        }
    }
}
