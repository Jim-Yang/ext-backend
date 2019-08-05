export interface User {
  id: string
  name: string
  room?: Room
  createdAt?: string
  icon?: string
}

export interface Room {
  id: string
  name: string
  timeStamp: number
  videoUrl: string
  users: [User]
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  room: Room
  user: User
  payload: string
  createdAt: string
}

export interface ConnectionParams {
  userId: string
  roomName: string
}
