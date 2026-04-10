import { CustomerData, CustomerManager } from "./customerManager.js";
import { OrderData, OrderManager } from "./orderManager.js";
import { ProductData, ProductManager } from "./productManager.js";
import { SingletonBase } from "./singleton.js";
import { StaffData, StaffManager } from "./StaffManager.js";

import * as readline from "readline";
import type { Customer } from "./customer.js";
import { TemptOrderData } from "./order.js";
import { Gender } from "./person.js";
import { StaffRole } from "./staff.js";
import { TempProductData } from "./product.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export class AppController extends SingletonBase {

    private readonly STORE_DB: string = 'save data storage';

    private orderMgr = OrderManager.getInstance<OrderManager>();
    private productMgr = ProductManager.getInstance<ProductManager>();
    private staffMgr = StaffManager.getInstance<StaffManager>();
    private customerMgr = CustomerManager.getInstance<CustomerManager>();

    public constructor() {
        super();
    }

    private ask(question: string): Promise<string> {
        return new Promise((resolve) => {
            rl.question(question, (answer) => {
                resolve(answer);
            });
        });
    }

    private logInvalid(error: string) {
        console.log(error);
    }

    public async menu() {
        console.log("\n===== MENU =====");
        console.log("1. Đơn hàng");
        console.log("2. Sản phẩm");
        console.log("3. Khách hàng");
        console.log("4. Nhân sự");
        console.log("0. Thoát");

        const choice = parseInt(await this.ask("Chọn: "));

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
            await this.menu();
        }
    }
//#region Order function
    private async orderMenu() {
        console.log("\n ====== ORDER MENU ======");
        console.log("1. Tạo đơn hàng");
        console.log("2. Xoá đơn hàng");
        console.log("0. Trở về Menu");

        const option = parseInt(await this.ask("Chọn: "));

        switch(option) {
            case 1:
                await this.createNewOrder();
                await this.orderMenu();
                break;
            case 2:
                await this.deleteOrder();
                await this.orderMenu();
                break;
            case 0:
                await this.menu();
                break;
            default:
                console.log("❌ Lựa chọn không hợp lệ!");
                await this.orderMenu();
        }
    }
    private async createNewOrder() {
        console.log("==== CREAT ORDER ====");
        const staffID = parseInt(await this.ask("Mã nhân viên bán hàng: "));
        let customerID = parseInt(await this.ask("Mã khách hàng: "));
        const productID = parseInt(await this.ask("Mã sản phẩm: "));
        const qty = parseInt(await this.ask("Số lượng mua: "));
        const price = parseInt(await this.ask("Giá bán: "))
        const subTotal = qty * price;
        let customer: Customer | undefined = this.customerMgr.findCustomerByID(customerID);
        while (!customer) {
            console.log("Mã khách hàng không hợp lệ")
            customerID = parseInt(await this.ask("Mã khách hàng: "));
            customer = this.customerMgr.findCustomerByID(customerID);
        }
        const dicount = (1 - customer.GetDiscountRate()) * price;

        const newOrder = new TemptOrderData(staffID, customerID, productID, qty, price, subTotal, dicount);

        this.orderMgr.createOrder(newOrder);
    }
    private async deleteOrder() {
        console.log("XOÁ ĐƠN HÀNG")
        const orderID = parseInt(await this.ask("Mã đơn hàng: "));
        const order = this.orderMgr.findOrderByID(orderID);
        if (!order) {
            console.log("Không thể tìm thấy order");
            this.orderMenu();
            return;
        } else {
            this.orderMgr.deleteOrder(orderID);
            console.log("Order đã được xoá")
        }
    }
//#endregion
//#region Product function
    private async productMenu() {
        console.log("\n ====== PRODUCT MENU ======");
        console.log("1. Thêm sản phẩm mới");
        console.log("2. Xoá sản phẩm");
        console.log("3. Xuất kho");
        console.log("4. Nhập kho");
        console.log("5. Xem toàn bộ sản phẩm")
        console.log("0. Trở về Menu");

        const option = parseInt(await this.ask("Chọn: "));

        switch(option) {
            case 1:
                await this.addNewProduct();
                await this.productMenu();
                break;
            case 2:
                await this.deleteProduct();
                await this.productMenu();
                break;
            case 3:
                await this.exportProduct();
                await this.productMenu();
                break;
            case 4:
                await this.importProduct();
                await this.productMenu();
                break;
            case 5:
                await this.viewAllProducts();
                await this.productMenu();
                break;
            case 0:
                await this.menu();
                break;
            default:
                console.log("❌ Lựa chọn không hợp lệ!");
                await this.productMenu();
        }
    }
    private async addNewProduct() {
        console.log("==== THÊM SẢN PHẨM MỚI ====");
        const name = await this.ask("Tên sản phẩm: ");
        const categoryStr = (await this.ask("Danh mục (TOP/BOTTOM/OUTER/SHOES/ACC): ")).toUpperCase();
        const sizeStr = (await this.ask("Kích cỡ (S/M/L/XL): ")).toUpperCase();
        const price = parseInt(await this.ask("Giá nhập: "));
        const qty = parseInt(await this.ask("Số lượng: "));
        
        // Convert to enum values
        const categoryMap: any = { 'TOP': 0, 'BOTTOM': 1, 'OUTER': 2, 'SHOES': 3, 'ACC': 4 };
        const sizeMap: any = { 'S': 0, 'M': 1, 'L': 2, 'XL': 3 };
        
        const tempProduct = new TempProductData(name, sizeMap[sizeStr], categoryMap[categoryStr], price, qty);
        this.productMgr.addProduct(tempProduct);
        console.log("✅ Sản phẩm đã được thêm!");
    }

    private async deleteProduct() {
        console.log("==== XOÁ SẢN PHẨM ====");
        const productID = parseInt(await this.ask("Mã sản phẩm: "));
        const product = this.productMgr.findProductByID(productID);
        if (!product) {
            console.log("❌ Không tìm thấy sản phẩm");
            return;
        }
        this.productMgr.DeactivateProduct(productID);
        console.log("✅ Sản phẩm đã được xoá!");
    }

    private async exportProduct() {
        console.log("==== XUẤT KHO ====");
        const productID = parseInt(await this.ask("Mã sản phẩm: "));
        const qty = parseInt(await this.ask("Số lượng xuất: "));
        this.productMgr.ExportProduct(productID, qty);
        console.log("✅ Xuất kho thành công!");
    }

    private async importProduct() {
        console.log("==== NHẬP KHO ====");
        const productID = parseInt(await this.ask("Mã sản phẩm: "));
        const qty = parseInt(await this.ask("Số lượng nhập: "));
        const price = parseInt(await this.ask("Đơn giá nhập: "));
        this.productMgr.ImportProduct(productID, qty, price);
        console.log("✅ Nhập kho thành công!");
    }

    private async viewAllProducts() {
        console.log("==== DANH SÁCH SẢN PHẨM ====");
        const products = this.productMgr.getAll();
        if (products.length === 0) {
            console.log("Không có sản phẩm nào!");
            return;
        }
        products.forEach(p => console.log(p.viewProductDetails()));
    }
//#endregion


    private async customerMenu() {
        console.log("\n ====== CUSTOMER MENU ======");
        console.log("1. Thêm khách hàng");
        console.log("2. Xoá khách hàng");
        console.log("0. Trở về Menu");

        const option = parseInt(await this.ask("Chọn: "));

        switch(option) {
            case 1:
                await this.addCustomer();
                await this.customerMenu();
                break;
            case 2:
                console.log("Chức năng đang phát triển");
                await this.customerMenu();
                break;
            case 0:
                await this.menu();
                break;
            default:
                console.log("❌ Lựa chọn không hợp lệ!");
                await this.customerMenu();
        }
    }

    private async addCustomer() {
        console.log("==== THÊM KHÁCH HÀNG ====");
        const name = await this.ask("Tên khách hàng: ");
        const phone = await this.ask("Số điện thoại: ");
        const genderStr = await this.ask("Giới tính (male/female): ");
        const gender = genderStr.toLowerCase() === 'male' ? Gender.male : Gender.female;
        
        this.customerMgr.addCustomer(name, phone, gender);
        console.log("✅ Khách hàng đã được thêm!");
    }

    private async staffMenu() {
        console.log("\n ====== STAFF MENU ======");
        console.log("1. Thêm nhân viên mới");
        console.log("2. Xoá nhân viên");
        console.log("0. Trở về Menu");

        const option = parseInt(await this.ask("Chọn: "));

        switch(option) {
            case 1:
                await this.addStaff();
                await this.staffMenu();
                break;
            case 2:
                await this.layoffStaff();
                await this.staffMenu();
                break;
            case 0:
                await this.menu();
                break;
            default:
                console.log("❌ Lựa chọn không hợp lệ!");
                await this.staffMenu();
        }
    }

    private async addStaff() {
        console.log("==== THÊM NHÂN VIÊN ====");
        const name = await this.ask("Tên nhân viên: ");
        const phone = await this.ask("Số điện thoại: ");
        const genderStr = await this.ask("Giới tính (male/female): ");
        const roleStr = (await this.ask("Chức vụ (OWNER/MANAGER/SALES_ASSOCIATE/CASHIER): ")).toUpperCase();
        const salary = parseInt(await this.ask("Lương cơ bản: "));
        
        const gender = genderStr.toLowerCase() === 'male' ? Gender.male : Gender.female;
        let role = StaffRole.SALES_ASSOCIATE;
        
        if (roleStr === 'OWNER') role = StaffRole.OWNER;
        else if (roleStr === 'MANAGER') role = StaffRole.MANAGER;
        else if (roleStr === 'CASHIER') role = StaffRole.CASHIER;
        else if (roleStr === 'WAREHOUSE_KEEPER') role = StaffRole.WAREHOUSE_KEEPER;
        else if (roleStr === 'SHIPPER') role = StaffRole.SHIPPER;
        else if (roleStr === 'ACCOUNTANT') role = StaffRole.ACCOUNTANT;
        
        this.staffMgr.addStaff(name, phone, gender, role, salary);
        console.log("✅ Nhân viên đã được thêm!");
    }

    private async layoffStaff() {
        console.log("==== XOÁ NHÂN VIÊN ====");
        const staffID = parseInt(await this.ask("Mã nhân viên: "));
        this.staffMgr.layoffStaff(staffID);
        console.log("✅ Nhân viên đã được xoá!");
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

const newApp = AppController.getInstance<AppController>();

newApp.menu();
