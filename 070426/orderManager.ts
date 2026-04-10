import { Order, TemptOrderData } from "./order.js";
import { SingletonBase } from "./singleton.js";

export class OrderManager extends SingletonBase {
    private orders: Order[] = [];
    private nextOrderID: number = 1;

    public constructor() {
        super();
    }

    public createOrder(data: TemptOrderData) {
        const newOrder = new Order(this.nextOrderID, data);
        this.orders.push(newOrder);
        this.nextOrderID++;
    }
    public deleteOrder(orderID: number) {
        this.orders = this.orders.filter(o => o.getID() != orderID);
    }

    public findOrderByID = (orderID: number) => this.orders.find(o => o.getID() === orderID);

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