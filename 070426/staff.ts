import { Gender, Person } from "./person.js";

export class Staff extends Person {
    private role: StaffRole;
    private salary: number;
    constructor(isID: number, name: string, phone: string, gender: Gender, role: StaffRole, salary: number) {
        super(isID, name, phone, gender);
        this.role = role;
        this.salary = salary;
    }
    getDisplayDetails = (): string => 
        `[STAFF] Name: ${this.name} | Role: ${this.role} | Contact: ${this.phoneNumber}`

    GetDiscountRate = (): number => 0.5;
}

export enum StaffRole {
    OWNER = "Owner", 
    MANAGER = "Manager", 

    SALES_ASSOCIATE = "Sales associate", 
    CASHIER = "Cashier",

    WAREHOUSE_KEEPER = "Warehouse keeper",
    SHIPPER = "Shipper",

    ACCOUNTANT = "Accountant"
}