import { _decorator, Component, director, EventKeyboard, Input, input, KeyCode, Vec2 } from 'cc';
import { GameEventData } from '../GameEventData';
import { RoomManager } from './RoomManager';
import { RoomState } from '../GameData';
const { ccclass } = _decorator;

@ccclass('InputManager')
export class InputManager extends Component {
    private dirInput: Vec2 = new Vec2(0, 0);

    protected onLoad() {
        this.register();
    }

    private register() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: EventKeyboard) {
        if (RoomManager.instance.getState() != RoomState.start) {
            return;
        }
        let isChanged = false;
        switch(event.keyCode) {
            case KeyCode.ARROW_DOWN:
            case KeyCode.KEY_S:
                this.dirInput.y = -1;
                isChanged = true;
                break;
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W:
                this.dirInput.y = 1;
                isChanged = true;
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
                this.dirInput.x = -1;
                isChanged = true;
                break;
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_D:
                this.dirInput.x = 1;
                isChanged = true;
                break;
        }
        if (isChanged) {
            director.emit(GameEventData.INPUT_MOVE, this.dirInput);
        }
    }

    private onKeyUp(event: EventKeyboard) {
        if (RoomManager.instance.getState() != RoomState.start) {
            return;
        }
        let isChanged = false;
        switch (event.keyCode) {
            case KeyCode.ARROW_DOWN:
            case KeyCode.ARROW_UP:
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
                this.dirInput.y = 0;
                isChanged = true;
                break;
            case KeyCode.ARROW_LEFT:
            case KeyCode.ARROW_RIGHT:
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.dirInput.x = 0;
                isChanged = true;
                break;
            case KeyCode.SPACE:
                director.emit(GameEventData.INPUT_FIRE);
        }
        if (isChanged) {
            director.emit(GameEventData.INPUT_MOVE, this.dirInput);
        }
    }
    private unregister() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    protected onDestroy() {
        this.unregister();
    }
}

