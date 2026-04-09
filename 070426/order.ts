export class Order {
    //Order information
    private orderID: number;
    private staffID: number;
    private customerID: number;

    //Product information
    private productID: number = 0;
    private quantity: number = 0;
    private priceAtPurchase: number = 0;

    //Finance information
    private subTotal: number = 0;
    private discountAmount: number = 0;
    private finalTotal: number = 0;

    constructor(orderID: number, data: TemptOrderData) {
        this.orderID = orderID;
        this.staffID = data.staffID;
        this.customerID = data.customerID;
        this.productID = data.productID;
        this.quantity = data.quantity;
        this.priceAtPurchase = data.priceAtPurchase;
        this.subTotal = data.subTotal;
        this.discountAmount = data.discountAmount;
        this.finalTotal = data.finalTotal;
    }

    public getID = (): number => this.orderID;
}

export class TemptOrderData {
    public staffID: number;
    public customerID: number;

    public productID: number;
    public quantity: number;
    public priceAtPurchase: number;

    public subTotal: number;
    public discountAmount: number;
    public finalTotal: number;

    constructor(staffID: number, cusID: number, proID: number, qty: number, price: number, sub: number, dis: number) {
        this.staffID = staffID;
        this.customerID = cusID;
        this.productID = proID;
        this.quantity = qty;
        this.priceAtPurchase = price;
        this.subTotal = sub;
        this.discountAmount = dis;
        this.finalTotal = sub - dis;
    }
}