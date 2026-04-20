const BulletManager = require("./BulletManager");

cc.Class({
    extends: cc.Component,

    properties: {
        rb: cc.RigidBody,
        speed: 1000
    },
    onLoad() {
        this.node.init = this.init.bind(this);
    },
    init(direction) {
        this.rb.linearVelocity = direction.mul(this.speed);
    },
    unuse() {
        BulletManager.return(this.node);
    }
});
