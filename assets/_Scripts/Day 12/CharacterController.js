const inputManager = require("InputManager");
const character = require("Character_ex4");
const Emitter = require("../mEmitter");
const GameEvent = require("./EventInGame");

const CharacterController = cc.Class({
    extends: cc.Component,

    properties: {
        inputMgr: inputManager,
        char: character
    },
    start() {
        this.registerEvent();
    },
    
    update(dt) {
        this.playerMoving(dt);
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
            this.char.idling();
        } 
    },
    playerAttack() {
        this.char.shoot();
    },
    onDestroy() {
        this.unRegisterEvent();
    },
    unRegisterEvent() {
        Emitter.instance.removeAllEventsByTarget(this);
    }
});
