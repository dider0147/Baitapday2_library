const Emitter = require("../mEmitter");
const BulletManager = require("./BulletManager");
const GameEvent = require("./EventInGame");

const Bullet = cc.Class({
    extends: cc.Component,

    properties: {
        rb: cc.RigidBody,
        damage: 10,
        speed: 1000,
        config: {
            default: null,
            visible: false
        }
    },
    onLoad() {
        this.node.init = this.init.bind(this);
    },
    update(dt) {
        if(!this.config || !this.config.manager) {
            return;
        }
        this.checkPosition(dt);
    },
    init(data) {
        this.rb.linearVelocity = data.direction.mul(this.speed);
        this.config = {
            limitX: data.limitX,
            limitY: data.limitY,
            direction: data.direction,
            manager: data.manager
        }
    },
    disable() {
        if (this.config && this.config.manager) {
            let mgr = this.config.manager;
            this.config = null; 
            
            mgr.return(this.node);
        } else {
            this.node.active = false;
        }
    },
    checkPosition(dt) {
        const worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let nextX = worldPos.x + (this.speed * this.config.direction.x * dt);
        let nextY = worldPos.y + (this.speed * this.config.direction.y * dt);

        if (nextX > this.config.limitX || nextX < 0
            || nextY > this.config.limitY || nextX < 0
        ) {
            this.disable();
        }

    },
    onCollisionEnter(other, self) {
        const data = {
            enemy: other,
            damage: this.damage
        }
        Emitter.instance.emit(GameEvent.INGAME_ENEMY_HIT, data);
        this.disable();
    }
});

module.exports = Bullet;
