class LibraryData {
    constructor(books, inventory) {
        this.books = books;
        this.inventory = inventory;
    }
    getCombineData() {
        return this.books.map(book => {
                return new Data(
                    book,
                    this.inventory.getQuantity(book.id)
                )
            });
    }  
}

class Data {
    constructor(book, qty) {
        this.book = book;
        this.qty = qty;
    }
}
module.exports = LibraryData;