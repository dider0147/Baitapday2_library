const Character_ex4 = cc.Class({
    extends: cc.Component,

    properties: {
        model: cc.Node,
        anim: sp.Skeleton,
        speed: 0,
        firePoint: cc.Node,
        isLeftFace: {
            default: false,
            visible: false
        }
    },

    start() {
        this.setAnimation("idle", true);
    },
    
    moving(dir, dt) {
        let position = this.node.position;
        position.x += this.speed * dir.x * dt;
        position.y += this.speed * dir.y * dt;
        this.setAnimation("run", true);
        this.node.position = position;
        const shouldFlip = (!this.isLeftFace && dir.x < 0) || (this.isLeftFace && dir.x >0);
        console.log(shouldFlip);
        if (shouldFlip) {
            this.flip();
        }
    },
    flip() {
        this.model.scaleX *= -1;
        this.isLeftFace = !this.isLeftFace;
    },
    shoot() {
        console.log("fire");
    },
    setAnimation(name, isLoop) {
        this.anim.setAnimation(0, name, isLoop);
    }
});

module.exports = Character_ex4;
