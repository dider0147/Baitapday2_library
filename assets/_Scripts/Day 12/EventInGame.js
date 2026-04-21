const GameEvent = Object.freeze({
    INPUT_FIRE: "input fire",
    INGAME_ENEMY_HIT: "enemy hit"
})

/*export const PlayerType = Object.freeze({
    normal: 0,
    speed: 1,
    power: 2
})

const PLAYER_CONFIGS = {
    [PlayerType.normal]: {
        speed: 200,
        attackCooldown: 0.3,
        bulletColor: cc.Color.WHITE,
        animPrefix: {
            [PlayerState.idle]: {name: "idle", loop: true},
            [PlayerState.run]: {name: "run", loop: true},
            [PlayerState.attack]: {name: "shoot", loop: false}
        }
    },
    [PlayerType.speed]: {
        speed: 300,
        attackCooldown: 0.15,
        bulletColor: cc.Color.GREEN,
        animPrefix: {
            0: {name: "hoverboard", loop: true},
            1: {name: "hoverboard", loop: true},
            [PlayerState.attack]: {name: "hoverboard", loop: true}
        
        }
    },
    [PlayerType.power]: {
        speed: 100,
        attackCooldown: 0.6,
        bulletColor: cc.Color.RED,
        animPrefix: {
            [PlayerState.idle]: {name: "idle", loop: true},
            [PlayerState.run]: {name: "run", loop: true},
            [PlayerState.attack]: {name: "aim", loop: false}
        }
    }
};*/

module.exports = GameEvent;