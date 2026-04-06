export class Inventory {
    private items: Map<number, number>;

    constructor() {
        this.items = new Map<number, number>();
    }
    addItem(bookId: number, quantity: number): void {
        
        const currentQuantity = this.items.get(bookId) || 0;
        this.items.set(bookId, currentQuantity + quantity);
    }

    removeItem(bookId: number, quantity: number): void {
        const currentQuantity = this.items.get(bookId) || 0;
        if (currentQuantity < quantity) {
            throw new Error(`Not enough stock for book ID ${bookId}.`);
        }
        this.items.set(bookId, currentQuantity - quantity);
    }

    getStock(bookId: number): number {
        return this.items.get(bookId) || 0;
    }
}