import { User, Room } from "./data";

/**
 * Come to think about it, the server doesn't actually need these, the client does
 * 
 * Available Commands:
 * 
 * Play/Pause/Seek/Change url will send a message to the chat from the User
 * 
 * Things like... people joining/leaving rooms will be send by the Server 'User'
 */
export enum COMMANDS {
    PLAY="PLAY",
    PAUSE="PAUSE",
    SEEK="SEEK",
    CHANGE_URL="CHANGE_URL",
    SEND_MESSAGE="SEND_MESSAGE"
}

export type Command = {
    type: COMMANDS,
    payload?: Payload,
    sender: User,
    room: Room
}

export type Payload = {
    url?: string
    seekTime?: string
    message?: string
}

/**
 * Command Types
 */

export interface PlayCommand extends Command {
    type: COMMANDS.PLAY
}

export interface PauseCommand extends Command {
    type: COMMANDS.PAUSE
}

export interface SeekCommand extends Command {
    type: COMMANDS.SEEK
    payload: { seekTime: string }
}

export interface ChangeUrlCommand extends Command {
    type: COMMANDS.CHANGE_URL,
    payload: { url: string }
}

export interface MessageCommand extends Command {
    type: COMMANDS.SEND_MESSAGE,
    payload: { message: string }
}