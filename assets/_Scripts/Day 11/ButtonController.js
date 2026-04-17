var charAnim = require("CharAnim");
var btn = require("ButtonPrefab");
const Emitter = require('mEmitter');

const ButtonController = cc.Class({
    extends: cc.Component,

    properties: {
        char: charAnim,
        btnPrefab: cc.Prefab,
        content: cc.Node
    },

    start() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("DO_ANIM", this.doAnimByTouch.bind(this), this);

        this.initData();
    },

    initData() {
        const animNames = this.char.getAllAnimName();
        animNames.forEach(name => {
            const newButton = cc.instantiate(this.btnPrefab);
            this.content.addChild(newButton);
            const script = newButton.getComponent(btn);
            script.initData(name, this.char);
        })
    },
    doAnimByTouch(name) {
        this.char.setupAnim(name);
    },
    onDestroy() {
        Emitter.instance.removeAllEventsByTarget(this);
    }
});

module.exports = ButtonController;
