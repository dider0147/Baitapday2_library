const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label | null = null;

    @property(sp.Skeleton)
    anim: sp.Skeleton | null = null;

    @property(cc.ProgressBar)
    progressBar: cc.ProgressBar | null = null;

    @property
    nameChar: string = '';

    @property
    speed = 0;

    private isLeftFace = false;

    private currentEnergy = 0;

    private movement = new cc.Vec3(0, 0);
    private currentDuration = 0;

    private readonly MAX_ENERGY = 100;
    private readonly DURATION_ONE_STEP = 1;

    private isMoving = false;

    private limitAreaX = 0;
    private limitAreaY = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (this.label) {
            this.label.string = this.nameChar;
        }
        this.isLeftFace = this.anim!.node.scaleX > 0 ? false : true;
        this.currentEnergy = this.MAX_ENERGY;
        this.limitAreaX = this.node.parent.getComponent(cc.Canvas).designResolution.width/2;
        console.log("relution x: " + this.limitAreaX);
        this.limitAreaY = this.node.parent.getComponent(cc.Canvas).designResolution.height/2;
        console.log("relution y: " + this.limitAreaY);
    }   

    update(dt: number): void {
        if (this.currentDuration <=0) {
            this.resetMovement();
            return;
        }
            
        this.currentDuration -= dt;
        let pos = this.node.position;
        pos = new cc.Vec3(pos.x + this.movement.x * dt * this.speed, pos.y + this.movement.y * dt * this.speed, 0);
        if (pos.x < this.limitAreaX && pos.x > -this.limitAreaX && pos.y < this.limitAreaY && pos.y > -this.limitAreaY) {
            this.node.position = pos;
        }
        
        if (this.isMoving) {
            if (!this.progressBar)
                return;
            let barSpeed = 5;
            this.currentEnergy -= dt * barSpeed;
            let progress = this.progressBar.progress;
            progress = this.calculateEnergyPercent(this.currentEnergy);
            this.progressBar.progress = progress;
            if (this.currentEnergy <= 0) {
                this.node.active = false;
            }
        }
    }
    private moveLeft() {
        if (this.isMoving) {
            return;
        }
        //this.resetMovement();
        this.movement.x = -1;
        this.setAnim("run");
        this.isMoving = true;
        this.currentDuration = this.DURATION_ONE_STEP;
        if (!this.isLeftFace) {
            this.flip();
        }
    }
    
    private moveRight() {
        if (this.isMoving) {
            return;
        }
        this.currentDuration = this.DURATION_ONE_STEP;
        //this.resetMovement();
        this.movement.x = 1;
        this.setAnim("run");
        this.isMoving = true;
        if (this.isLeftFace) {
            this.flip();
        }
    }
    private moveUp() {
        if (this.isMoving) {
            return;
        }
        this.currentDuration = this.DURATION_ONE_STEP;
        //this.resetMovement();
        this.movement.y = 1;
        this.setAnim("walk");
        this.isMoving = true;
    }
    private moveDown() {
        if (this.isMoving) {
            return;
        }
        this.currentDuration = this.DURATION_ONE_STEP;
        //this.resetMovement();
        this.movement.y = -1;
        this.setAnim("walk");
        this.isMoving = true;
    }
    public resetMovement() {
        this.movement = new cc.Vec3(0, 0, 0);
        this.setAnim("idle");
        this.isMoving = false;
    }
    private flip() {
        this.anim!.node.scaleX *= -1;
        this.isLeftFace = !this.isLeftFace;
    }
    private setAnim(animName: string) {
        this.anim?.setAnimation(0, animName, true);
    }
    private calculateEnergyPercent = (energy: number) => energy/this.MAX_ENERGY;
}
