class Inventory {
    constructor() {
        this.items = [];
    }

    addItem(id, qty) {
        if (this.items.some(item => item.id === id)) {
            this.items[this.items.findIndex(item => item.id === id)].qty += qty;
            console.log("Sách đã được thêm vào kho.");
        } else {
            const newItem = new Item(id, qty);
            this.items.push(newItem);
        }
    }
    removeItem(id, qty) {
        const item = this.items.find(item => item.id === id);
        if (item) {
            item.qty -= qty;
            if (item.qty < 0) {
                return `Not enough quantity of item with ID ${id} to remove.`;
            }
            else if (item.qty === 0) {
                return `Item with ID ${id} has been removed from inventory.`;
            }
            else {
                return `Removed ${qty} of item with ID ${id}. Remaining quantity: ${item.qty}.`;
            }
        }
    }
    getQuantity(id) {
        const item = this.items.find(item => item.id === id);
        
        return item ? item.qty : 0;
    }
    getInventory() {
        return this.items;
    }
}

class Item {
    constructor(id, qty) {
        this.id = id;
        this.qty = qty;
    }
}
module.exports = Inventory;