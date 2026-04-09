import { resolve, type promises } from "dns";
import { CustomerData, CustomerManager } from "./customerManager.js";
import { OrderData, OrderManager } from "./orderManager.js";
import { ProductData, ProductManager } from "./productManager.js";
import { SingletonBase } from "./singleton.js";
import { StaffData, StaffManager } from "./StaffManager.js";

import * as readline from "readline";
import { parse } from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export class AppController extends SingletonBase {

    private readonly STORE_DB: string = 'save data storage';

    private orderMgr = OrderManager.getInstance();
    private productMgr = ProductManager.getInstance<ProductManager>();
    private staffMgr = StaffManager.getInstance<StaffManager>();
    private customerMgr = CustomerManager.getInstance<CustomerManager>();

    private ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    private async menu() {
    while (true) {
        console.log("\n===== MENU =====");
        console.log("1. Đơn hàng");
        console.log("2. Sản phẩm");
        console.log("3. Khách hàng");
        console.log("4. Nhân sự");
        console.log("0. Thoát");

        const choice = Number(await this.ask("Chọn: "));

        switch (choice) {
        case 1:
            await this.orderMenu();
            break;
        case 2:
            await this.productMenu();
            break;
        case 3:
            await this.customerMenu();
            break;
        case 4:
            await this.staffMenu();
            break;
        case 0:
            console.log("Thoát...");
            rl.close();
            return;
        default:
            console.log("❌ Lựa chọn không hợp lệ!");
        }
    }
    }

    private async orderMenu() {

    }
    private async productMenu() {

    }

    private async customerMenu() {

    }

    private async staffMenu() {
        
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
