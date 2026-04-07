import { Gender, Person } from "./person.js";

export class Customer extends Person {
//#region static data
    private readonly BRONZE_MEMBER: number = 20;
    private readonly SILVER_MEMBER: number = 50;
    private readonly GOLD_MEMBER: number = 100;
    private readonly VIP_MEMBER: number = 250;
//#endregion
    private point: number = 0;
    constructor(isID:number, name:string, phone: string, gender: Gender) {
        super(isID, name, phone, gender);
    }
    public getDisplayDetails = (): string =>
         `[CUSTOMER] Name: ${this.name} | Phone: ${this.phoneNumber} | Points: ${this.point}`;
    public GetDiscountRate(): number {
        if (this.point >= this.VIP_MEMBER) return 0.25;
        else if (this.point >= this.GOLD_MEMBER) return 0.15;
        else if (this.point >= this.SILVER_MEMBER) return 0.1;
        else if (this.point >= this.BRONZE_MEMBER) return 0.05;
        else return 0;
    }
    public updatePoint(point: number): void {
        this.point += point;
    }
}