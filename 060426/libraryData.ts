import { Book } from "./book.js";
import { Inventory } from "./inventory.js";

export class LibraryData {

    private datas!: Data[];

    constructor(public books: Book[], public inventory: Inventory) {

        this.CombineDatas();
    }
    CombineDatas(): Data[] {
        this.datas = [];
        for (const book of this.books) {
            const qty = this.inventory.getStock(book.id);
            this.datas.push(new Data(book, qty));
        }
        return this.datas;
    }
    getDatas(): Data[] {
        return this.datas;
    }
}

export class Data {
    constructor(public book: Book, public qty: number) {}
}
