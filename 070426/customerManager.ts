import { Customer } from "./customer.js";
import { Gender } from "./person.js";
import Singleton from "./singleton.js";

export class CustomerManager extends Singleton<CustomerManager> {
    private customers: Customer[] = [];

    public registerMember(name: string, phone: string, gender: Gender) {
        const newCustomer = new Customer(this.customers.length + 1, name, phone, gender);
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

    private findCustomerByID = (isID: number): Customer | undefined=>
        this.customers.find(c => c.GetID() === isID);
}