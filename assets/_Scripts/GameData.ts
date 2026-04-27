export enum GameState {
    lobby, room, exit
}
export enum RoomState {
    ready, start, end, restart, win
}
export interface IAnimMixConfig {
    from: string;
    to: string;
    duration: number;
}
export class CharacterData{
    public static readonly ANIM_PORTAL = "portal";
    public static readonly ANIM_IDLE = "idle";
    public static readonly ANIM_WALK = "walk";
    public static readonly ANIM_RUN = "run";
    public static readonly ANIM_SHOOT = "shoot";
    public static readonly ANIM_HOVERBOARD = "hoverboard";
    public static readonly ANIM_JUMP = "jump";
    public static readonly ANIM_DEATH = "death";

    public static readonly MIX_CONFIGS: IAnimMixConfig[] = [
        { from: this.ANIM_IDLE, to: this.ANIM_RUN, duration: 0.15 },
        { from: this.ANIM_RUN, to: this.ANIM_IDLE, duration: 0.15 },
        { from: this.ANIM_WALK, to: this.ANIM_RUN, duration: 0.1 },
        { from: this.ANIM_RUN, to: this.ANIM_WALK, duration: 0.1 },

        { from: this.ANIM_IDLE, to: this.ANIM_SHOOT, duration: 0.05 },
        { from: this.ANIM_RUN, to: this.ANIM_SHOOT, duration: 0.05 },
        { from: this.ANIM_SHOOT, to: this.ANIM_IDLE, duration: 0.1 },
        { from: this.ANIM_SHOOT, to: this.ANIM_RUN, duration: 0.1 },

        { from: this.ANIM_RUN, to: this.ANIM_JUMP, duration: 0.1 },
        { from: this.ANIM_JUMP, to: this.ANIM_RUN, duration: 0.15 },
        { from: this.ANIM_IDLE, to: this.ANIM_HOVERBOARD, duration: 0.2 },
        { from: this.ANIM_HOVERBOARD, to: this.ANIM_IDLE, duration: 0.2 },

        { from: this.ANIM_IDLE, to: this.ANIM_DEATH, duration: 0.05 },
        { from: this.ANIM_RUN, to: this.ANIM_DEATH, duration: 0.05 },
    ];
}

export enum PlayerType {
    normal, speed, power
}

export enum PlayerState {
    NONE, PORTAL, IDLE, MOVE, ATTACK, DEATH
}



