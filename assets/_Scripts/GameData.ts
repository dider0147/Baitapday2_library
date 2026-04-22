
export class CharacterData{
    public static readonly ANIM_PORTAL = "portal";
    public static readonly ANIM_IDLE = "idle";
    public static readonly ANIM_WALK = "walk";
    public static readonly ANIM_RUN = "run";
    public static readonly ANIM_SHOOT = "shoot";
    public static readonly ANIM_HOVERBOARD = "hoverboard";
    public static readonly ANIM_JUMP = "jump";
    public static readonly ANIM_DEATH = "death";
}

export enum PlayerType {
    normal, speed, power
}

export enum PlayerState {
    NONE, PORTAL, IDLE, MOVE, ATTACK, DEATH
}



