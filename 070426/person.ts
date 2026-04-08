export enum Gender {male, female, other}

export abstract class Person {
    protected isID: number;
    protected name: string;
    protected phoneNumber: string;
    protected gender: Gender;

    constructor(isID: number, name: string, phoneNumber: string, gender: Gender) {
        this.isID = isID;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
    }

    public GetBasicContact = (): string => `${this.name} - ${this.phoneNumber}`;

    public GetID = (): number => this.isID;

    abstract getDisplayDetails(): string;

    abstract GetDiscountRate(): number;
}
