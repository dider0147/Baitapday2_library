const BulletManager = cc.Class({
    extends: cc.Component,

    properties: {
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
        bulletNode.init(direction);
    }
});

module.exports = BulletManager;
