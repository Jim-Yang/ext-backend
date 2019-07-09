export class SubscriptionResolvers {
    public testSub = {
        resolve: (payload) => {
            console.log(payload)
            return payload.value
        },
        subscribe: (_parent, { room }, context) => {
            return context.pubSub.asyncIterator(room)
        }
    }
}
