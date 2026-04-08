import { Gender, Person } from "./person.js";

export class Staff extends Person {
    private role: StaffRole;
    private salary: number;
    private datesOff: Date[] = [];
    constructor(isID: number, name: string, phone: string, gender: Gender, role: StaffRole, salary: number) {
        super(isID, name, phone, gender);
        this.role = role;
        this.salary = salary;
    }
    getDisplayDetails = (): string =>  `[STAFF] Name: ${this.name} | Role: ${this.role} | Contact: ${this.phoneNumber}`;

    public updateRole(role: StaffRole): void {
        this.role = role;
    }

    public registerOff(date: Date) {
        this.datesOff.push(date);
    }

    public actualSalaryPaidPerMonth(month: number): number {
        const countDayOff = this.datesOff.filter(d => d.getMonth() === month).length;
        return this.salary * ((22 - countDayOff) / 22); 
    }

    public GetDiscountRate = (): number => 0.5;
    
    public getRole = (): StaffRole => this.role;
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