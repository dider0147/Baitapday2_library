const CharAnim = cc.Class({
    extends: cc.Component,

    properties: {
        anim: sp.Skeleton
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
    }
});

module.exports = CharAnim;
