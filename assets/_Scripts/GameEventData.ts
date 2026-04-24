
export class GameEventData {
    public static readonly INPUT_MOVE =  "input move";
    public static readonly INPUT_FIRE =  "input fire";
    public static readonly INPUT_SWITCH = "input switch";

    public static readonly ENEMY_HIT = "enemy hit";
}

export enum GameState {
    lobby, room, exit
}

