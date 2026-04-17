const charAnim = require("CharAnim");
const Emitter = require('mEmitter');

const ButtonPrefab = cc.Class({
    extends: cc.Component,

    properties: {
        animName: {
            default: "",
            visible: false
        },
        
        char: {
            default: null,
            type: charAnim,
            visible: false
        },

        nameLabel: cc.Label,
        btn: cc.Button
    },

    start() {
        this.btn.node.on(cc.Node.EventType.TOUCH_END, this.doAnimCharacter, this);
    },

    initData(name, char) {
        this.animName = name;
        this.char = char;
        this.displayUI(name);
    },
    displayUI(name) {
        this.nameLabel.string = name;
    },
    doAnimCharacter() {
        Emitter.instance.emit('DO_ANIM', this.animName);
    },
    onDestroy() {
        this.btn.node.off(cc.Node.EventType.TOUCH_END, this.doAnimCharacter, this);
    }
});

module.exports = ButtonPrefab;
