import { Gender } from "./person.js";
import { SingletonBase } from "./singleton.js";
import { Staff, StaffRole } from "./staff.js";

export class StaffManager extends SingletonBase {
    private staffs: Staff[] = [];
    private nextID: number = 1;

    public addStaff(name: string, phone: string, gender: Gender, role: StaffRole, salary: number) {
        const newStaff = new Staff(this.nextID ,name, phone, gender, role, salary)
        this.staffs.push();
        this.nextID++;
    }

    public layoffStaff(isID: number) {
        this.staffs = this.staffs.filter(s => s.GetID() !== isID)
    }

    public calculateTotalSalaryBudget(): number {
        let totalSalaryBudget = 0;
        this.staffs.forEach(s => totalSalaryBudget += this.calculateStaffSalaryPerYear(s));
        return totalSalaryBudget;
    }

    public calculateStaffSalaryPerYear(staff: Staff): number {
        let totalSalary = 0;
        for (let i = 1; i <= 12; i++) {
            totalSalary += staff.actualSalaryPaidPerMonth(i);
        }
        return totalSalary;
    }

    public generalPayrollReport() {
        
    }

    public getStaffByRole = (role: StaffRole) => this.staffs.filter(s => s.getRole() === role);

    public getSaveData = (): StaffData => new StaffData(this.staffs, this.nextID);

    public loadFromData(data: StaffData): void {
        this.staffs = data.staffs;
        this.nextID = data.nextID;
    }
}

export class StaffData {
    public staffs: Staff[];
    public nextID: number;

    constructor(staffs: Staff[], nextID: number) {
        this.staffs = staffs;
        this.nextID = nextID;
    }
}