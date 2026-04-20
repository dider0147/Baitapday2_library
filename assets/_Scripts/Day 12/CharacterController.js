const inputManager = require("InputManager");
const character = require("Character_ex4");

const CharacterController = cc.Class({
    extends: cc.Component,

    properties: {
        inputMgr: inputManager,
        char: character
    },
    
    update(dt) {
        this.playerMoving(dt);
    },

    playerMoving(dt) {
        const dir = this.inputMgr.getDirection();
        if (dir.mag() > 0) {
            this.char.moving(dir, dt);
        }
    }

});
