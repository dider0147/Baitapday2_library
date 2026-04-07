export enum Size { S, M, L, XL }
export enum Category {TOP, BOTTOM, OUTER, SHOES, ACC}

export class Product {
  private id: number;
  private name: string;
  private size: Size;
  private category: Category;
  private priceImport: number;
  private qty: number;
  private isDeactivate: boolean;

  constructor(id: number, name: string, size: Size, category: Category, price: number, qty: number) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.category = category;
    this.priceImport = price;
    this.qty = qty;
    this.isDeactivate = false;
  }

  public calculatePrice(price: number, qty: number): void {
    const totalCurrentPrice = this.priceImport * this.qty;
    const totalNewPrice = price * qty;
    this.priceImport = (totalCurrentPrice + totalNewPrice) / (this.qty + qty);
  }

  public updateStock(qty: number): void {
    this.qty += qty;
  }

  public deactivateProduct(): void {
    this.isDeactivate = true;
  }

  public viewProductDetails = (): string => {
    return `ID: ${this.id}, Name: ${this.name}, Size: ${Size[this.size]}, 
    Category: ${Category[this.category]}, Price: ${this.priceImport.toFixed(2)}, 
    Stock: ${this.qty}`;
  }

  public getId = (): number => this.id;
  public getStock = (): number => this.qty;
  public getDeactivateStatus = (): boolean => this.isDeactivate;
}

