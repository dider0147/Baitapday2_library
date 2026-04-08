import { Product, type Category, type Size } from "./product.js";
import { SingletonBase } from "./singleton.js";

export class ProductManager extends SingletonBase {
    private static readonly THRESHOLD_QTY: number = 10;

    private products: Product[] = [];
    private nextID: number = 1;

    public addProduct(name: string, size: Size, category: Category, price: number, qty: number): void {
        const product = new Product(this.nextID, name, size, category, price, qty);
        this.products.push(product);
        this.nextID++;
    }

    public ImportProduct(ID: number, qty: number, price: number): void {
        const product = this.products.find(p => p.getId() === ID);

        if (!product) {
            console.error(`Product with ID ${ID} not found.`);
            return;
        }
        product.calculatePrice(qty, price);
        product.updateStock(qty);
    }

    public ExportProduct(ID: number, qty: number) {
        const product = this.products.find(p => p.getId() === ID);
        
        if (!product) 
            console.error(`Product with ID ${ID} not found.`);
        else {
            if(product.getStock() < qty) {
                console.error(`Not enough stock for product with ID ${ID}. Current stock: ${product.getStock()}`);
                return;
            }
            product.updateStock(-qty);
        }
    }

    public checkLowStockProducts = (): Product[] => 
        this.products.filter(p => p.getStock() <= ProductManager.THRESHOLD_QTY
        && !p.getDeactivateStatus()); 

    public DeactivateProduct(ID: number): void {
        const product = this.findProductByID(ID);
        if (!product) {
            console.error(`Product with ID ${ID} not found.`);
        }
        product?.deactivateProduct();
    }

    public findProductByID = (ID: number): Product | undefined => this.products.find(p => p.getId() === ID);

    public getAll = (): Product[] => this.products;

    public getSaveData = (): ProductData =>  new ProductData(this.products, this.nextID);

    public loadFromData(data: ProductData): void {
        this.products = data.products;
        this.nextID = data.nextID;
    }
}

export class ProductData {
    public products: Product[];
    public nextID: number;

    constructor(products: Product[], nextID: number) {
        this.products = products;
        this.nextID = nextID;
    }
}