const Bullet = require("Bullet");
const mEmitter = require("../mEmitter");

cc.Class({
    extends: cc.Component,

    properties: {
        modelNode: cc.Node,
        hpBar: cc.ProgressBar,
        hp: 100,
        duration: 1,
        currentHP: {
            default: 0,
            visible: false
        },
        startY: {
            default: 0,
            visible: false
        }
    },
    onEnable() {
        this.currentHP = this.hp;
        this.startY = this.node.position.y;
        this.moving();
    },
    moving() {
        cc.tween(this.node)
            .to(this.duration / 2, { y: this.startY + 500}, { easing: 'sineInOut' })
            .to(this.duration / 2, { y: this.startY - 500}, { easing: 'sineInOut' })
            .union()
            .repeatForever()
            .start()
    },
    flashRed() {
        this.resetStatus();
        cc.tween(this.modelNode)
            .to(0.1, {color: cc.Color.RED})
            .to(0.1, {color: cc.Color.WHITE})
            .start();
    },
    resetStatus() {
        cc.Tween.stopAllByTarget(this.modelNode);
        this.modelNode.color = cc.Color.WHITE;
    },
    takeDamage(damage) {
        this.currentHP -= damage;
        this.flashRed();
        cc.tween(this.hpBar)
            .to(0.2, {progress: this.calculateHPBar()})
            .call(this.checkDisable())
            .start();
    },
    checkDisable() {
        if (this.currentHP <= 0) {
            this.node.destroy();
        }
    },
    calculateHPBar() {
        console.log(this.currentHP);
        return this.currentHP / this.hp;
    }
});
