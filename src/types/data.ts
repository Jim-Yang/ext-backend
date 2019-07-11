export type User = {
    id: string
    name: string
    room?: Room
    createdAt?: string
    icon?: String
}
  
export type Room = {
    id: string
    name: string
    timeStamp: number
    videoUrl: string
    users: [User]
    createdAt: string
    updatedAt: string
}
  
  export type Message = {
    id: string
    room: Room
    user: User
    payload: string
    createdAt: string
}