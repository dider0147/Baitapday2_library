import { Gender, Person } from "./person.js";

export class Customer extends Person {
//#region static data
    private readonly BRONZE_MEMBER: number = 20;
    private readonly SILVER_MEMBER: number = 50;
    private readonly GOLD_MEMBER: number = 100;
    private readonly VIP_MEMBER: number = 250;
//#endregion
    private point: number = 0;
    private type: CustomerType = CustomerType.Regular;
    constructor(isID:number, name:string, phone: string, gender: Gender) {
        super(isID, name, phone, gender);
    }
    public getDisplayDetails = (): string => `[CUSTOMER] Name: ${this.name} | Phone: ${this.phoneNumber} | Points: ${this.point}`;

    public GetDiscountRate(): number {
        if (this.type === CustomerType.VIP) return 0.25;
        else if (this.type === CustomerType.Gold) return 0.15;
        else if (this.type === CustomerType.Silver) return 0.1;
        else if (this.type === CustomerType.Bronze) return 0.05;
        else return 0;
    }

    private updateMemberType(point: number): CustomerType {
        if (this.point >= this.VIP_MEMBER) return CustomerType.VIP;
        else if (this.point >= this.GOLD_MEMBER) return CustomerType.Gold;
        else if (this.point >= this.SILVER_MEMBER) return CustomerType.Silver;
        else if (this.point >= this.BRONZE_MEMBER) return CustomerType.Bronze;
        else return CustomerType.Regular;
    }
    
    public updatePoint(point: number): void {
        this.point += point;
        this.type = this.updateMemberType(this.point);
    }

    public getType = (): CustomerType => this.type;
}

export enum CustomerType {Regular, Bronze, Silver, Gold, VIP}