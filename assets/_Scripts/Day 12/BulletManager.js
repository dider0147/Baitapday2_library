const BulletManager = cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Canvas,
        bulletPrefabs: [cc.Prefab],
        bulletLayer: cc.Node,
        pools: {
            default: {},
            visible: false
        }
    },
    onLoad() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.init();
    },

    init() {
        this.bulletPrefabs.forEach(prefab => { this.pools[prefab.name] = new cc.NodePool() });
    },
    get(prefab) {
        const poolName = prefab.name;
        if(!this.pools[poolName]) {
            this.pools[poolName] = new cc.NodePool();
        }
        let bullet = null;

        if (this.pools[poolName].size() > 0) {
            bullet = this.pools[poolName].get();
        } else {
            bullet = cc.instantiate(prefab);
            bullet.name = poolName;
        }
        return bullet;
    },
    return(bulletNode) {
        const poolName = bulletNode.name;
        this.pools[poolName].put(bulletNode);
    },
    instantiate(prefab, firePoint, direction) {
        const bulletNode = this.get(prefab);
        const posFire = this.bulletLayer.convertToNodeSpaceAR(firePoint);
        bulletNode.position = posFire;
        this.bulletLayer.addChild(bulletNode);
        const data = {
            limitX: this.canvas.designResolution.width,
            limitY: this.canvas.designResolution.height,
            direction: direction,
            manager: this
        }
        bulletNode.init(data);
    }
});

module.exports = BulletManager;
