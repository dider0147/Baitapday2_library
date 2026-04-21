const Enemy = require("Enemy");
const Emitter = require("../mEmitter");
const GameEvent = require("./EventInGame");

const EnemyController = cc.Class({
    extends: cc.Component,

    properties: {
       enemies: [Enemy]
    },
    start() {
        this.registerEvent();
    },

    registerEvent() {
        Emitter.instance.registerEvent(GameEvent.INGAME_ENEMY_HIT, this.takeDamage.bind(this), this);
    },
    takeDamage(data) {
        for (let e of this.enemies) {
            if (e.node === data.enemy.node) {
                console.log("1 " + e.node);
                console.log("2 " + data.enemy.node);
                e.takeDamage(data.damage);
                break;
            }
        }
    },
    onDestroy() {
        Emitter.instance.removeAllEventsByTarget(this);
    }
});

module.exports = EnemyController;
