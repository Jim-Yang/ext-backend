export enum COMMAND {
    PLAY="PLAY",
    PAUSE="PAUSE",
    SEEK="SEEK",
    CHANGE_URL="CHANGE_URL",
    LEAVE_ROOM="LEAVE_ROOM",
    JOIN_ROOM="JOIN_ROOM"
}

export type PlayCommand = {
    type: COMMAND.PLAY
}

export type PauseCommand = {
    type: COMMAND.PAUSE
}

export type SeekCommand = {
    type: COMMAND.SEEK
    payload: number
}

export type ChangeUrlCommand = {
    type: COMMAND.CHANGE_URL,
    payload: number
}

export type Commands = PlayCommand | PauseCommand | SeekCommand | ChangeUrlCommand;