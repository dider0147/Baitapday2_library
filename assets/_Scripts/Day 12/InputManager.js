const Emitter = require("../mEmitter");
const GameEvent = require("./EventInGame");


const InputManager = cc.Class({
    extends: cc.Component,

    properties: {
        direction: {
            default: cc.v2(0, 0),
            visible: false
        }
    },

    onLoad() {
        Emitter.instance = new Emitter();
        this.registerEvent();
    },
    registerEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onkeydown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    unRegisterEvent() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onkeydown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onkeydown(event) {
        let isChanged = false;
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                this.direction.y = 1;
                isChanged = true;
                break;
            case cc.macro.KEY.down:
                this.direction.y = -1;
                isChanged = true;
                break;
            case cc.macro.KEY.left:
                this.direction.x = -1;
                isChanged = true;
                break;
            case cc.macro.KEY.right:
                this.direction.x = 1;
                isChanged = true;
                break;
        }
        if (isChanged) {
            Emitter.instance.emit(GameEvent.INPUT_MOVE, this.direction);
        }
    },
    onKeyUp(event) {
        let isChanged = false;
        switch(event.keyCode) {
            case cc.macro.KEY.space:
                Emitter.instance.emit(GameEvent.INPUT_FIRE);
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.down:
                this.direction.y = 0;
                isChanged = true;
                break;
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.direction.x = 0;
                isChanged = true;
                break;
        }
        if (isChanged) {
            Emitter.instance.emit(GameEvent.INPUT_MOVE, this.direction);
        }
    },
    onDestroy() {
        this.unRegisterEvent();
    }
});

module.exports = InputManager;