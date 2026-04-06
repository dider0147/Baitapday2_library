import { Book } from "./book.js";

export class UserManager {
    private users: User[] = [];
    readonly feePerDate: number = 0.3; // Fee per day for late returns

    addUser(name: string, age: number, email: string): void {
        const newUser = new User(this.users.length + 1, name, age, email);
        this.users.push(newUser);
    }

    calculateFeePerLateDate(borrowDate: Date, returnDate: Date): number {
        const timeDiff = returnDate.getTime() - borrowDate.getTime();
        const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysLate > 0 ? daysLate * this.feePerDate : 0;
    }
    updateUserInfo(ID: number, email: string, name: string, age: number, newEmail: string): void {
        const user = this.users.find(u => u.id === ID);
        if (user) {
            user.updateInfo(name, age, newEmail);
        }
    }
    findUserById = (ID: number): User | undefined => this.users.find(u => u.id === ID);
    filterUserByName = (name: string): User[] => this.users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()));
    filterUserByAge = (age: number): User[] => this.users.filter(u => u.age === age);       
    getUserByEmail = (email: string): User | undefined => this.users.find(user => user.email === email);
}


export class User {
    constructor(
        public id: number, 
        public name: string, 
        public age: number, 
        public email: string
    ) {}

    private booksBorrowed: Map<Book, Date> = new Map<Book, Date>();

    updateInfo(name: string, age: number, email: string): void {
        this.name = name;
        this.age = age;
        this.email = email;
    }

    borrowBook(book: Book): void {
        this.booksBorrowed.set(book, new Date());
    }

    returnBook(bookId: number): void {
        for (const [book, borrowDate] of this.booksBorrowed) {
            if (book.id === bookId) {
                this.booksBorrowed.delete(book);
                break;
            }
        }
    }

    getBorrowedBooks(): Book[] {
        return Array.from(this.booksBorrowed.keys());
    }
}