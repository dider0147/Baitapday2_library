const BulletManager = require("BulletManager");

const PlayerState = Object.freeze({
    idle: 0,
    run: 1,
    attack: 2
})

const Character_ex4 = cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Canvas,
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
        },
        config: {
            default: null,
            visible: false
        }
    },

    start() {
        this.initConfig();
        this.setState(PlayerState.idle);
    },
    initConfig() {
        this.config = {
            limitX: this.canvas.designResolution.width,
            limitY: this.canvas.designResolution.height
        }
    },
    moving(dir, dt) {
        const worldPos = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        let nextX = worldPos.x + (dir.x * this.speed * dt);
        let nextY = worldPos.y + (dir.y * this.speed * dt);
        let actualDir = cc.v2(dir.x, dir.y);
        if (nextX > this.config.limitX || nextX < 0) {
            actualDir.x = 0;
        }
        if (nextY > this.config.limitY || nextY < 0) {
            actualDir.y = 0;
        }
        let position = this.node.position;
        position.x += this.speed * actualDir.x * dt;
        position.y += this.speed * actualDir.y * dt;
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
            case PlayerState.attack:
                this.setAnimation("shoot", false);
                this.shoot();
                break;
        }
        this.currentState = state;
    },
    getStateConfig() {
        //const config = PLAYER_CONFIGS
    },
    getState() {
        return this.currentState;
    }
});


module.exports = {
    Character_ex4: Character_ex4,
    PlayerState: PlayerState
}
