export class Order {
    //Order information
    private orderID: number;
    private staffID: number;
    private customerID: number;

    //Product information
    private productID: number;
    private quantity: number;
    private priceAtPurchase: number;

    //Finance information
    private subTotal: number;
    private discountAmount: number;
    private finalTotal: number;

    constructor(orderID: number, staffID: number, ctID: number, productID: number, qty: number, price: number, sub: number, dis: number) {
        this.orderID = orderID;
        this.staffID = staffID;
        this.customerID = ctID;
        this.productID = productID;
        this.quantity = qty;
        this.priceAtPurchase = price;
        this.subTotal = sub;
        this.discountAmount = dis;
        this.finalTotal = sub - dis;
    }

    public getID = (): number => this.orderID;
}