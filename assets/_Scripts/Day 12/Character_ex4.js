const BulletManager = require("BulletManager");

export const PlayerState = {
    idle: 0,
    run: 1,
    attack: 2
}

const Character_ex4 = cc.Class({
    extends: cc.Component,

    properties: {
        model: cc.Node,
        anim: sp.Skeleton,
        speed: 0,
        firePoint: cc.Node,
        bulletPrefab: cc.Prefab,
        bulletManager: BulletManager,
        isLeftFace: {
            default: false,
            visible: false
        },
        currentState: {
            default: null,
            visible: false
        }
    },

    start() {
        this.idling();
    },
    idling() {
        this.setState(PlayerState.idle);
    },
    
    moving(dir, dt) {
        let position = this.node.position;
        position.x += this.speed * dir.x * dt;
        position.y += this.speed * dir.y * dt;
        this.setState(PlayerState.run);
        this.node.position = position;
        this.checkShouldFlip(dir);
    },
    checkShouldFlip(dir) {
        const shouldFlip = (!this.isLeftFace && dir.x < 0) || (this.isLeftFace && dir.x > 0);
        if (shouldFlip) {
            this.flip();
        }
    },
    flip() {
        this.model.scaleX *= -1;
        this.isLeftFace = !this.isLeftFace;
    },
    shoot() {
        let direction = cc.Vec2.RIGHT.mul(this.isLeftFace ? -1 : 1);
        this.bulletManager.instantiate(this.bulletPrefab, this.firePoint.convertToWorldSpaceAR(cc.v2(0, 0)), direction);
    },
    setAnimation(name, isLoop) {
        this.anim.setAnimation(0, name, isLoop);
    },
    setState(state) {
        if (this.currentState && this.currentState === state) {
            return;
        }
        switch(state) {
            case PlayerState.idle:
                this.setAnimation("idle", true);
                break;
            case PlayerState.run:
                this.setAnimation("run", true);
                break;
        }
        this.currentState = state;
    }
});


module.exports = Character_ex4;
