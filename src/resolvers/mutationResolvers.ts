import { AppContext } from "../types/graphql";

export class MutationResolvers {
    
    public testSub = (_parent, { room, value }, context) => {
        context.pubSub.publish(room, {value})
        return value
    }

    public sendCommand = (_parent, { roomName, userId, command }, context: AppContext) => {
        context.pubSub.publish(roomName, command)
        return context.prisma.room({name: roomName})
    }

    public createUser = async (_parent, { userName }, context: AppContext) => {
        const user = await context.prisma.createUser({ icon: "SomeIcon", name: userName })
        return user
    }

    // Separate User and Room

    public createRoom = async (_parent, { roomName }, context: AppContext) => {
        const room = await context.prisma.createRoom({ name: roomName })
        return room
    }

    public joinRoom = async (_parent, { userId, roomName }, context: AppContext) => {
        const room = await context.prisma.updateRoom({
            data: { users: { connect: { id: userId }}},
            where: {
                name: roomName
            }
        })
        return room
    }

    public leaveRoom = async (_parent, { userId, roomName }, context: AppContext) => {
        const room = await context.prisma.updateRoom({
            data: { users: { disconnect: {id :userId }}},
            where: {
                name: roomName
            }
        })
        return room;
    }
}