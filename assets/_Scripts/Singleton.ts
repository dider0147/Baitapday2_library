import { _decorator, Component } from 'cc';

export class Singleton<T> extends Component {
    private static _instance: any = null;

    public static get instance(): any {
        return this._instance;
    }

    protected onLoad() {
        if (Singleton._instance) {
            this.node.destroy();
            return;
        }
        Singleton._instance = this;
    }

    protected onDestroy() {
        if (Singleton._instance === this) {
            Singleton._instance = null;
        }
    }
}