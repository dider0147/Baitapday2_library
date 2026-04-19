const Emitter = require('mEmitter');

const CharAnim = cc.Class({
    extends: cc.Component,

    properties: {
        anim: sp.Skeleton,

        isAnim: {
        default: false,
        visible: false 
    }
    },
    start() {
        this.setupAnim("idle");
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("DO_ANIM", this.setupAnim.bind(this), this);
    },

    setupAnim(animName) {
        this.anim.setAnimation(0, animName, true);
    },

    getAllAnimName() {
        let animName = [];
        this.anim.skeletonData.getRuntimeData().animations.forEach(element => {
            animName.push(element.name);
        });
        return animName;
    },
    doActionSystem() {
        if (this.isAnim) {
            return;
        }
        console.log(this.isAnim);
        this.node.stopAllActions();
        this.isAnim = true;
        this.setupAnim("run");
        var step1 = cc.sequence(
            cc.moveBy(0.5, 500, 0),
            cc.callFunc(() => {
                this.node.scaleX *= -1; 
            })
        );

        var step2 = cc.sequence(
            cc.moveBy(0.5, -500, 0),
            cc.callFunc(() => {
                this.node.scaleX *= -1;
            })
        );

        var repeatAction = cc.repeat(cc.sequence(step1, step2), 4);

        var onComplete = cc.callFunc(() => {
            this.isAnim = false;
            this.setupAnim("idle"); 
        });

        var finalSequence = cc.sequence(repeatAction, onComplete);
        this.node.runAction(finalSequence);
    }
});

module.exports = CharAnim;
