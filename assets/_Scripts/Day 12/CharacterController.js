const inputManager = require("InputManager");
const Emitter = require("../mEmitter");
const GameEvent = require("./EventInGame");
const { PlayerState, Character_ex4 } = require("./Character_ex4");

const CharacterController = cc.Class({
    extends: cc.Component,

    properties: {
        inputMgr: inputManager,
        char: Character_ex4,
        canvas: cc.Canvas,
        attackCooldown: 1,
        currentAttackCD: {
            default: 0,
            visible: false
        }
    },
    start() {
        this.registerEvent();
        this.initConfig
    },
    
    update(dt) {
        if (this.checkAttackCooldown(dt)) {
            return;
        }
        this.playerMoving(dt);
    },
    checkAttackCooldown(dt) {
    if (this.char.getState() === PlayerState.attack) {
        this.currentAttackCD -= dt;
            if (this.currentAttackCD > 0) {
                return true;
            }
        }
        return false; 
    },
    registerEvent() {
        Emitter.instance.registerEvent(GameEvent.INPUT_FIRE, this.playerAttack.bind(this), this);
    },
    playerMoving(dt) {
        const dir = this.inputMgr.getDirection().normalizeSelf();
        if (Math.abs(dir.mag()) > 0) {
            this.char.moving(dir, dt); 
        }
        else {
            this.char.setState(PlayerState.idle);
        } 
    },
    playerAttack() {
        if (this.currentAttackCD > 0) {
            return;
        }
        this.char.setState(PlayerState.attack);
        this.currentAttackCD = this.attackCooldown;
    },
    onDestroy() {
        this.unRegisterEvent();
    },
    unRegisterEvent() {
        Emitter.instance.removeAllEventsByTarget(this);
    }
});
