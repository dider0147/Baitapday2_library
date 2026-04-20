const Emitter = require('mEmitter');

const CharAnim = cc.Class({
    extends: cc.Component,

    properties: {
        modelAnim: sp.Skeleton,
        animTable: cc.Node,
        model: cc.Node,
        anim: cc.Animation,

        isAnim: {
            default: false,
            visible: false 
        },
        config: {
            default: null,
            serializable: false,
            visible: false 
        }
    },
    start() {
        this.initConfig();
        this.setupAnim("idle");
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("DO_ANIM", this.setupAnim.bind(this), this);
    },
    initConfig() {
        this.config = {
            pos: this.node.position,
            rot: this.node.rotation,
            sca: this.node.scale
        }
    },
    resetStatus() {
        this.stopAllAnim();

        this.node.position = this.config.pos;
        this.node.rotation = this.config.rot;
        this.node.scale = this.config.sca;
        this.model.scaleX = Math.abs(this.model.scaleX);

        this.isAnim = false;
    },

    setupAnim(animName) {
        this.modelAnim.setAnimation(0, animName, true);
    },
    flip() {
        this.model.scaleX *= -1; 
    },

    getAllAnimName() {
        return this.modelAnim.skeletonData.getRuntimeData().animations.map(a => a.name);
    },
    stopAllAnim() {
        this.node.stopAllActions();

        cc.Tween.stopAllByTarget(this.node);

        this.anim.stop();
    },
    toggleAnimTable(vale) {
        this.animTable.active = vale;
    },
    doActionSystem() {
        if (this.isAnim) {
            return;
        }
        this.resetStatus();
        this.isAnim = true;
        var step1 = cc.sequence(
            cc.callFunc(() => {
                this.isAnim = true;
                this.toggleAnimTable(false);
            }),
            cc.moveBy(0.5, 500, 0),
            cc.callFunc(() => {
                this.flip();
            })
        );

        var step2 = cc.sequence(
            cc.moveBy(0.5, -500, 0),
            cc.callFunc(() => {
                this.flip();
            })
        );

        var repeatAction = cc.repeat(cc.sequence(step1, step2), 4);

        var onComplete = cc.callFunc(() => {
            this.isAnim = false;
            this.toggleAnimTable(true);
        });

        var finalSequence = cc.sequence(repeatAction, onComplete);
        this.node.runAction(finalSequence);
    },
    doTween() {
        if (this.isAnim) {
            return;
        }
        this.resetStatus();
        this.isAnim = true;

        let originScale = this.node.scaleX;

        cc.tween(this.node)
            .call(() => this.toggleAnimTable(false))
            .by(1, { 
                scale: originScale, 
                position: { value: cc.v3(500, 0, 0), easing: 'sineOutIn' } 
            })
            .call(() => {
                this.flip();
            })
            .parallel(
                cc.tween().by(1, { scale: -originScale}),
                cc.tween().by(1, {x: -500})
            )
            .by(1, {angle: 360 })
            .call(() => {
                this.flip();
                this.toggleAnimTable(true)
                this.isAnim = false;
            })
            .start();
    },
    doSkeleleton() {
        if (this.isAnim) {
            return;
        }
        this.resetStatus();
        this.anim.play("Untitled");
    },
    setIsAnim(value) {
        this.isAnim = value;
    }
});


module.exports = CharAnim;
