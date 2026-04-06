import { Book } from "./book.js";
import { Inventory } from "./inventory.js";
import { LibraryData, Data } from "./libraryData.js";
import { SearchAndFilter } from "./searchandfilter.js";
import { User, UserManager } from "./userManager.js";
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

class Library {
    constructor() {
        this.InitializeLibrary();
    }
    private books!: Book[];
    private inventory!: Inventory;
    private userManager!: UserManager;
    private libraryData!: LibraryData;
    private searchAndFilter!: SearchAndFilter;
    
    InitializeLibrary(): void {
        this.books = [];
        this.inventory = new Inventory();
        this.userManager = new UserManager();
        this.libraryData = new LibraryData(this.books, this.inventory);
        this.searchAndFilter = new SearchAndFilter(this.libraryData);
    }

//#region BOOK SEGMENT

    registerBook(title: string, author: string, publishedYear: number, genre: string): void {
        const newBook = new Book(this.books.length + 1, title, author, publishedYear, genre);
        this.books.push(newBook);
    }

    updateBookInfo(bookId: number, title: string, author: string, publishedYear: number, genre: string): void {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            book.updateInfo(title, author, publishedYear, genre);
            this.libraryData.CombineDatas();
            console.log("Book information updated successfully!");
        } else {
            console.log(`Book with ID ${bookId} not found.`);
        }
    }

    updateInventory(bookId: number, quantity: number): void {
        const bookExists = this.books.some(book => book.id === bookId);
        if (!bookExists) {
            console.error(`Book with ID ${bookId} does not exist, please register book first.`);
        }
        else {
            this.inventory.addItem(bookId, quantity);
            this.libraryData.CombineDatas();
            console.log("Inventory updated successfully!");
        }
    }
    
    searchBookByID = (id: number): Data | undefined => this.searchAndFilter.searchBookByID(id);

    searchBooksByTitle = (title: string): Data[] => this.searchAndFilter.searchBooksByTitle(title);

    filterByGenre = (genre: string): Data[] => this.searchAndFilter.filterByGenre(genre);

    filterByYear = (year: number): Data[] => this.searchAndFilter.filterByYear(year);

    filterByAuthor = (author: string): Data[] => this.searchAndFilter.fillterByAuthor(author);
//#endregion

//#region USER SEGMENT

    registerUser(name: string, age: number, email: string): void {
        this.userManager.addUser(name, age, email);
    }
    updateUserInfo(ID: number, email: string, name: string, age: number, newEmail: string): void {
        this.userManager.updateUserInfo(ID, email, name, age, newEmail);
    }
    calculateFeePerLateDate = (borrowDate: Date, returnDate: Date): number => this.userManager.calculateFeePerLateDate(borrowDate, returnDate);
    findUserById = (ID: number): User | undefined => this.userManager.findUserById(ID);
    filterUserByName = (name: string): User[] => this.userManager.filterUserByName(name);
    filterUserByAge = (age: number): User[] => this.userManager.filterUserByAge(age);
    getUserByEmail = (email: string): User | undefined => this.userManager.getUserByEmail(email);
//#endregion

//#region MENU SEGMENT
    
    async Menu(): Promise<void> {
        console.log("-----Welcome to the Library Management System!-----");
        console.log("1. Book Management");
        console.log("2. User Management");
        console.log("3. Borrow/Return Books");
        console.log("4. Display Library Data");
        console.log("5. Exit");

        const choice = await rl.question("Please select an option:");

        switch (choice) {
            case "1":
                this.BookMenu();
                break;
            case "2":
                this.UserMenu();
                break;
            case "3":
                this.BorrowReturnMenu();
                break;
            case "4":
                this.displayLibraryData();
                this.Menu();
                break;
            case "5":
                console.log("Thank you for using the Library Management System. Goodbye!");
                rl.close();
                return;
            default:
                console.log("Invalid option, please try again.");
                this.Menu();
        }
    }
    async BookMenu(): Promise<void> {
        console.log("-----Book Management:-----");
        console.log("1. Register Book");
        console.log("2. Update Book Info");
        console.log("3. Update Inventory");
        console.log("4. Back to Main Menu");

        const choice = await rl.question("Please select an option: ");

        switch (choice) {
            case "1":
                const title = await rl.question("Enter book title: ");
                const author = await rl.question("Enter book author: ");
                const publishedYearStr = await rl.question("Enter published year: ");
                const genre = await rl.question("Enter book genre: ");
                const publishedYear = parseInt(publishedYearStr);
                if (isNaN(publishedYear)) {
                    console.log("Invalid published year, please enter a number.");
                    this.BookMenu();
                    return;
                }
                this.registerBook(title, author, publishedYear, genre);
                this.BookMenu();
                break;
            case "2":
                const bookIdStr = await rl.question("Enter book ID to update: ");
                const bookId = parseInt(bookIdStr);
                if (isNaN(bookId)) {
                    console.log("Invalid book ID, please enter a number.");
                    this.BookMenu();
                    return;
                }
                const newTitle = await rl.question("Enter new book title: ");
                const newAuthor = await rl.question("Enter new book author: ");
                const newPublishedYearStr = await rl.question("Enter new published year: ");
                const newGenre = await rl.question("Enter new book genre: ");
                const newPublishedYear = parseInt(newPublishedYearStr);
                if (isNaN(newPublishedYear)) {
                    console.log("Invalid published year, please enter a number.");
                    this.BookMenu();
                    return;
                }
                try {
                    this.updateBookInfo(bookId, newTitle, newAuthor, newPublishedYear, newGenre);
                } catch (error) {
                    console.log(error instanceof Error ? error.message : "An error occurred while updating book information.");
                }
                this.BookMenu();      
                break;
            case "3":
                const inventoryBookIdStr = await rl.question("Enter book ID to update inventory: ");
                const inventoryBookId = parseInt(inventoryBookIdStr);
                if (isNaN(inventoryBookId)) {
                    console.log("Invalid book ID, please enter a number.");
                    this.BookMenu();
                    return;
                }
                const quantityStr = await rl.question("Enter quantity to add/remove (use negative number to remove): ");
                const quantity = parseInt(quantityStr);
                if (isNaN(quantity)) {
                    console.log("Invalid quantity, please enter a number.");
                    this.BookMenu();
                    return;
                }
                try {
                    this.updateInventory(inventoryBookId, quantity);
                } catch (error) {
                    console.log(error instanceof Error ? error.message : "An error occurred while updating inventory.");
                }
                this.BookMenu();
                break;
            case "4":
                this.Menu();
                return;
            default:
                console.log("Invalid option, please try again.");
                this.BookMenu();
        }
    }
    async UserMenu(): Promise<void> {
        console.log("-----User Management:-----");
        console.log("1. Register User");
        console.log("2. Update User Info");
        console.log("3. Back to Main Menu");

        const choice = await rl.question("Please select an option: ");

        switch (choice) {
            case "1":
                const name = await rl.question("Enter user name: ");
                const ageStr = await rl.question("Enter user age: ");
                const email = await rl.question("Enter user email: ");
                const age = parseInt(ageStr);
                if (isNaN(age)) {
                    console.log("Invalid age, please enter a number.");
                    this.UserMenu();
                    return;
                }
                this.registerUser(name, age, email);
                this.UserMenu();
                break;
            case "2":
                const userIdStr = await rl.question("Enter user ID to update: ");   
                const newName = await rl.question("Enter new user name: ");
                const newAgeStr = await rl.question("Enter new user age: ");
                const newEmail = await rl.question("Enter new user email: ");
                const userId = parseInt(userIdStr);
                const newAge = parseInt(newAgeStr);
                if (isNaN(userId) || isNaN(newAge)) {
                    console.log("Invalid user ID or age, please enter numbers.");
                    this.UserMenu();
                    return;
                }
                try {
                    this.updateUserInfo(userId, newEmail, newName, newAge, newEmail);
                } catch (error) {
                    console.log(error instanceof Error ? error.message : "An error occurred while updating user information.");
                }   
                this.UserMenu();
                break;
            case "3":
                this.Menu();
                return;
            default:
                console.log("Invalid option, please try again.");
                this.UserMenu();
        }
    }
    async BorrowReturnMenu(): Promise<void> {
        console.log("-----Borrow/Return Books:-----");
        console.log("1. Borrow Book");
        console.log("2. Return Book");
        console.log("3. Back to Main Menu");

        const choice = await rl.question("Please select an option: ");

        switch (choice) {
            case "1":
                const userIdStr = await rl.question("Enter user ID: ");
                const bookIdStr = await rl.question("Enter book ID to borrow: ");
                const userId = parseInt(userIdStr);
                const bookId = parseInt(bookIdStr);
                if (isNaN(userId) || isNaN(bookId)) {
                    console.log("Invalid user ID or book ID, please enter numbers.");
                    this.BorrowReturnMenu();
                    return;
                }
                try {
                    this.borrowBook(userId, bookId);
                    console.log("Book borrowed successfully!");
                } catch (error) {
                    console.log(error instanceof Error ? error.message : "An error occurred while borrowing the book.");
                }
                this.BorrowReturnMenu();
                break;
            case "2":
                const returnUserIdStr = await rl.question("Enter user ID: ");
                const returnBookIdStr = await rl.question("Enter book ID to return: ");
                const returnUserId = parseInt(returnUserIdStr);
                const returnBookId = parseInt(returnBookIdStr);
                if (isNaN(returnUserId) || isNaN(returnBookId)) {
                    console.log("Invalid user ID or book ID, please enter numbers.");
                    this.BorrowReturnMenu();
                    return;
                }
                try {
                    this.returnBook(returnUserId, returnBookId);
                } catch (error) {
                    console.log(error instanceof Error ? error.message : "An error occurred while returning the book.");
                }
                this.BorrowReturnMenu();
                break;
            case "3":
                this.Menu();
                return;
            default:
                console.log("Invalid option, please try again.");
                this.BorrowReturnMenu();
        }
    }
// #endregion

    borrowBook(userId: number, bookId: number): void {
        const user = this.userManager.findUserById(userId);
        const bookData = this.searchAndFilter.searchBookByID(bookId);
        if (user && bookData && bookData.qty > 0) {
            user.borrowBook(bookData.book);
            this.inventory.addItem(bookId, -1);
            this.libraryData.CombineDatas();
            console.log("Book borrowed successfully!");
        } else {
            console.log(`Either user with ID ${userId} or book with ID ${bookId} not found, or the book is out of stock.`);
        }
    }

    returnBook(userId: number, bookId: number): void {
        const user = this.userManager.findUserById(userId);
        if (user) {
            user.returnBook(bookId);
            this.inventory.addItem(bookId, 1);
            this.libraryData.CombineDatas();
            console.log("Book returned successfully!");
        } else {

            console.log(`User with ID ${userId} not found.`);
        }
    }

    displayLibraryData(): void {
        const datas = this.libraryData.getDatas();
        datas.forEach(data => {
            console.log(`${data.book.getDescription()} - Quantity: ${data.qty}`);
        });
    }
}

let library = new Library();
library.Menu();