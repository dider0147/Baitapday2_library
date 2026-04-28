
export class GameEventData {
    public static readonly INPUT_MOVE =  "input move";
    public static readonly INPUT_FIRE =  "input fire";
    public static readonly INPUT_SWITCH = "input switch";

    public static readonly ENEMY_HIT = "enemy hit";

    public static readonly ROOM_END = "room end";

    public static readonly SETTING_BGM = "setting bgm";
    public static readonly SETTING_SFX = "setting sfx";
}

export enum GameState {
    lobby, room, exit
}

