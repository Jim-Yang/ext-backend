import { QueryResolvers } from "./queryResolvers";
import { SubscriptionResolvers } from "./subscriptionResolvers";
import { MutationResolvers } from "./mutationResolvers";

export function createRootResolvers() {
    return {
        Query: new QueryResolvers,
        Subscription: new SubscriptionResolvers,
        Mutation: new MutationResolvers
    }
}