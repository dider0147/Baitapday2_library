const Inventory = require('./inventory.js');
const SearchAndFilter = require('./search&filter.js');
const Book = require('./book.js');
const LibraryData = require('./LibraryData.js');

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Library {
    constructor() {
        this.books = [];
        this.inventory = new Inventory();
        this.nextID = 1;

        //this.loadLibrary();

        this.libraryData = new LibraryData(this.books, this.inventory);
        this.searchAndFilter = new SearchAndFilter(this.libraryData);
    }
    addBook(title, author, year, genre) {
        const book = new Book(
            this.nextID++, 
            title, 
            author, 
            year,
            genre
        );
        this.books.push(book);
        //this.saveLibrary();
    }
    addBookToInventory(id, qty) {
        this.inventory.addItem(id, qty);
        //this.saveLibrary();
    }
    borrowBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            if (this.searchAndFilter.findBookByID(id).qty > 0) {
                this.inventory.removeItem(id, 1);
                //this.saveLibrary();
                return `You have borrowed "${book.title}".`;
            } else {
                return `Sorry, "${book.title}" is currently unavailable.`;
            }
        } else {
            return `Book with ID ${id} not found.`;
        }
    }

    returnBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            this.inventory.addItem(id, 1);
            //this.saveLibrary();
            return `You have returned "${book.title}".`;
        } else {
            return `Book with ID ${id} not found.`;
        }
    }
    displayAllBooks() {
        const combineData = this.searchAndFilter.libraryData.getCombineData();

        console.log("-----DANH SÁCH QUẢN LÝ THƯ VIỆN-----");

        console.table(combineData.map(data => ({
            ID: data.book.id,
            Title: data.book.title,
            qty: data.qty
        })));
    }
    ask(question) {
        return new Promise(resolve => {
            rl.question(question, answer => {
                resolve(answer);
            });
        });
    }
    async menu() {
        console.log("-----MENU QUẢN LÝ THƯ VIỆN-----");
        console.log("1. Hiển thị tất cả sách");
        console.log("2. Thêm sách mới");
        console.log("3. Thêm sách vào kho");
        console.log("4. Mượn sách");
        console.log("5. Trả sách");
        console.log("6. Tìm kiếm sách theo ID");
        console.log("7. Tìm kiếm sách theo tiêu đề");
        console.log("8. Tìm kiếm sách theo tác giả");
        console.log("9. Tìm kiếm sách theo thể loại");
        console.log("0. Thoát");

        const option = await this.ask("Chọn một tùy chọn: ");
    }

    saveLibrary() {
        
    }

    loadLibrary() {
        
    }
    
}

const newLibrary = new Library();

newLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Novel');
newLibrary.addBook('To Kill a Mockingbird', 'Harper Lee', 1960, 'Novel');
newLibrary.addBook('1984', 'George Orwell', 1949, 'Dystopian');

newLibrary.addBookToInventory(1, 5);
newLibrary.addBookToInventory(2, 3);
newLibrary.addBookToInventory(3, 4);

newLibrary.borrowBook(1);

newLibrary.returnBook(3);

newLibrary.menu();
