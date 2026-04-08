import { Order } from "./order.js";
import { SingletonBase } from "./singleton.js";

export class OrderManager extends SingletonBase {
    private orders: Order[] = [];
    private nextOrderID: number = 1;

    public createOrder(staffID: number, ctID: number, pID: number, qty: number, price: number, sub: number, dis: number) {
        const newOrder = new Order(this.nextOrderID, staffID, ctID, pID, qty, price, sub, dis);
        this.orders.push(newOrder);
        this.nextOrderID++;
    }
    public deleteOrder(orderID: number) {
        this.orders = this.orders.filter(o => o.getID() != orderID);
    }

    public getSaveData = (): OrderData => new OrderData(this.orders, this.nextOrderID);

    public loadFromData(data: OrderData): void {
        this.orders = data.orders;
        this.nextOrderID = data.nextID
    }
}

export class OrderData {
    public orders: Order[];
    public nextID: number;

    constructor(orders: Order[], nextID: number) {
        this.orders = orders;
        this.nextID = nextID;
    }
}