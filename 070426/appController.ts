import { CustomerData, CustomerManager } from "./customerManager.js";
import { Order } from "./order.js";
import { OrderData, OrderManager } from "./orderManager.js";
import { ProductData, ProductManager } from "./productManager.js";
import { SingletonBase } from "./singleton.js";
import { StaffData, StaffManager } from "./StaffManager.js";

export class AppController extends SingletonBase {

    private readonly STORE_DB: string = 'save data storage';

    private orderMgr = OrderManager.getInstance<OrderManager>();
    private productMgr = ProductManager.getInstance<ProductManager>();
    private staffMgr = StaffManager.getInstance<StaffManager>();
    private customerMgr = CustomerManager.getInstance<CustomerManager>();

    private handleCheckout() {

    }

    private saveAllData(): void {
        const allData = new StoreData(
            this.orderMgr.getSaveData(),
            this.productMgr.getSaveData(),
            this.staffMgr.getSaveData(),
            this.customerMgr.getSaveData()
        );
        localStorage.setItem(this.STORE_DB, JSON.stringify(allData));
    }

    private loadAllData() {
        const savedData = localStorage.getItem(this.STORE_DB);

        if (savedData) {
            const data = JSON.parse(savedData);
            this.applyAllData(data);
        }
    }

    private applyAllData(data: StoreData) {
        this.orderMgr.loadFromData(data.orderData);
        this.productMgr.loadFromData(data.productData);
        this.staffMgr.loadFromData(data.staffData);
        this.customerMgr.loadFromData(data.customerData);
    }
}

export class StoreData {
    public orderData: OrderData;
    public productData: ProductData;
    public staffData: StaffData;
    public customerData: CustomerData;

    constructor(order: OrderData, pro: ProductData, staff: StaffData, cus: CustomerData) {
        this.orderData = order;
        this.productData = pro;
        this.staffData = staff;
        this.customerData = cus;
    }
}
