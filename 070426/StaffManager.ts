import { Gender } from "./person.js";
import Singleton from "./singleton.js";
import { Staff, StaffRole } from "./staff.js";

export class StaffManager extends Singleton<StaffManager> {
    private staffs: Staff[] = [];

    public addStaff(name: string, phone: string, gender: Gender, role: StaffRole, salary: number) {
        const newStaff = new Staff(this.staffs.length + 1 ,name, phone, gender, role, salary)
        this.staffs.push();
    }

    public layoffStaff(isID: number) {
        this.staffs = this.staffs.filter(s => s.GetID() !== isID)
    }
}