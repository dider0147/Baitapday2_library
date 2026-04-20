

const InputManager = cc.Class({
    extends: cc.Component,

    properties: {
        direction: {
            default: cc.v2(0, 0),
            visible: false
        }
    },

    onLoad() {
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
        switch(event.keyCode) {
            case cc.macro.KEY.up:
                this.direction.y = 1;
                break;
            case cc.macro.KEY.down:
                this.direction.y = -1;
                break;
            case cc.macro.KEY.left:
                this.direction.x = -1;
                break;
            case cc.macro.KEY.right:
                this.direction.x = 1;
                break;
        }
    },
    onKeyUp(event) {
        if (event.keyCode === cc.macro.KEY.up || event.keyCode === cc.macro.KEY.down) {
            this.direction.y = 0;
        }
        if (event.keyCode === cc.macro.KEY.left || event.keyCode === cc.macro.KEY.right) {
            this.direction.x = 0;
        }
    },
    getDirection() {
        return this.direction;
    },
    onDestroy() {
        this.unRegisterEvent();
    }
});

module.exports = InputManager;