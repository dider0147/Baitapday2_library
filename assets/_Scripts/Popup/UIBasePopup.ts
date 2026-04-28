import { _decorator, Button, Component, UIOpacity } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIBasePopup')
export abstract class UIBasePopup extends Component {
    @property(UIOpacity)
    protected opacity: UIOpacity;
    @property(Button)
    protected exitButton: Button;


    public show() {
        this.node.active = true;
    }

    public hide() {
        this.node.active = false;
    }
}

