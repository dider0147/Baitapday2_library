const Inventory = require('./inventory.js');
const SearchAndFilter = require('./search&filter.js');
const Book = require('./book.js');
const LibraryData = require('./LibraryData.js');
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Library {
    constructor() {
        this.books = [];
        this.inventory = new Inventory();
        this.nextID = 1;

        this.loadLibrary();

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
        this.saveLibrary();
    }
    borrowBook(id) {
        const book = this.books.find(book => book.id === id);
        if (book) {
            if (this.searchAndFilter.findBookByID(id).qty > 0) {
                this.inventory.removeItem(id, 1);
                this.saveLibrary();
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
            this.saveLibrary();
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
            Author: data.book.author,
            Year: data.book.year,
            Genre: data.book.genre,

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

        switch (option) {
            case '1':
                this.displayAllBooks();
                this.menu();
                break;
            case '2':
                const title = await this.ask("Nhập tiêu đề sách: ");
                const author = await this.ask("Nhập tác giả sách: ");
                const year = parseInt(await this.ask("Nhập năm xuất bản: "));
                const genre = await this.ask("Nhập thể loại sách: ");
                this.addBook(title, author, year, genre);
                console.log("Sách đã được thêm vào thư viện.");
                this.menu();
                break;
            case '3':
                const idToAdd = parseInt(await this.ask("Nhập ID sách cần thêm vào kho: "));
                const qtyToAdd = parseInt(await this.ask("Nhập số lượng cần thêm: "));
                this.addBookToInventory(idToAdd, qtyToAdd);
                this.menu();
                break;
            case '4':
                const idToBorrow = parseInt(await this.ask("Nhập ID sách cần mượn: "));
                console.log(this.borrowBook(idToBorrow));
                this.menu();
                break;
            case '5':
                const idToReturn = parseInt(await this.ask("Nhập ID sách cần trả: "));
                console.log(this.returnBook(idToReturn));
                this.menu();
                break;
            case '6':
                const idToSearch = parseInt(await this.ask("Nhập ID sách cần tìm: "));
                const bookByID = this.searchAndFilter.findBookByID(idToSearch);
                if (bookByID) {
                    console.log(`Sách tìm thấy: ${bookByID.title} - Tác giả: ${bookByID.author}`);
                } else {
                    console.log("Sách không tìm thấy.");
                }
                this.menu();
                break;
            case '7':
                const titleToSearch = await this.ask("Nhập tiêu đề sách cần tìm: ");
                const booksByTitle = this.searchAndFilter.findBooksByTitle(titleToSearch);
                if (booksByTitle.length > 0) {
                    console.log("Sách tìm thấy:");
                    booksByTitle.forEach(book => {
                        console.log(`- ${book.title} - Tác giả: ${book.author}`);
                    });
                } else {
                    console.log("Sách không tìm thấy.");
                }
                this.menu();
                break;
            case '8':
                const authorToSearch = await this.ask("Nhập tác giả sách cần tìm: ");
                const booksByAuthor = this.searchAndFilter.findBooksByAuthor(authorToSearch);
                if (booksByAuthor.length > 0) {
                    console.log("Sách tìm thấy:");
                    booksByAuthor.forEach(book => {
                        console.table(`- ${book.title} - Tác giả: ${book.author}`);
                    });
                } else {
                    console.log("Sách không tìm thấy.");
                }
                this.menu();
                break;
            case '9':
                const genreToSearch = await this.ask("Nhập thể loại sách cần tìm: ");
                const booksByGenre = this.searchAndFilter.findBooksByGenre(genreToSearch);
                if (booksByGenre.length > 0) {
                    console.log("Sách tìm thấy:");
                    booksByGenre.forEach(book => {
                        console.log(`- ${book.title} - Tác giả: ${book.author}`);
                    });
                } else {
                    console.log("Sách không tìm thấy.");
                }
                this.menu();
                break;
            case '0':
                console.log("Thoát chương trình.");
                rl.close();
                return;
            default:
                console.log("Lựa chọn không hợp lệ. Vui lòng chọn lại.");
                this.menu();
                break
        }     
    }
    saveLibrary() {
        const data = {
            books: this.books,
            inventory: this.inventory.getInventory()
        };
        fs.writeFileSync('libraryData.json', JSON.stringify(data, null, 2));
    }
    loadLibrary() {
        if (fs.existsSync('libraryData.json')) {
            const data = JSON.parse(fs.readFileSync('libraryData.json'));
            this.books = data.books.map(book => new Book(book.id, book.title, book.author, book.year, book.genre));
            this.inventory.loadInventory(data.inventory);
            this.nextID = this.books.length > 0 ? Math.max(...this.books.map(book => book.id)) + 1 : 1;
        }
    }
            
 }

const newLibrary = new Library();

newLibrary.menu();
