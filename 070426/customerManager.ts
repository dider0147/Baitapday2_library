import { Customer, CustomerType } from "./customer.js";
import { Gender } from "./person.js";
import { SingletonBase } from "./singleton.js";

export class CustomerManager extends SingletonBase {
    private customers: Customer[] = [];
    private nextID: number = 1;

    public addCustomer(name: string, phone: string, gender: Gender) {
        const newCustomer = new Customer(this.nextID, name, phone, gender);
        this.customers.push(newCustomer);
    }

    public addPoint(isID: number, payment: number): void {
        const customer = this.findCustomerByID(isID);
        if (!customer) {
            console.error("Customer is not a member, please register first");
            return;
        }
        const paymentAfterDiscount = payment * (1 - customer.GetDiscountRate());
        const point = paymentAfterDiscount / 1000;
        customer.updatePoint(point);
    }

    public findCustomerByID = (isID: number): Customer | undefined => this.customers.find(c => c.GetID() === isID);

    public findCustomerByPhone = (phone: string): Customer | undefined => this.customers.find(c => c.GetPhone() === phone);

    public getCustomersByType = (type: CustomerType): Customer[] => this.customers.filter(c => c.getType() === type);

    public getAll = (): Customer[] => this.customers;

    public getSaveData = (): CustomerData => new CustomerData(this.customers, this.nextID);;

    public loadFromData(data: CustomerData) {
        this.customers = data.customers;
        this.nextID = data.nextID;
    }
}

export class CustomerData{
    public customers: Customer[];
    public nextID: number;
    constructor(customers: Customer[], nextID: number) {
        this.customers = customers;
        this.nextID = nextID;
    }
}