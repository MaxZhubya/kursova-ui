import {Area} from './area';
import {Laboratory} from './laboratory';

export enum ProductCategory {
  LEHKOVIY, GRUSOVIY, AVTOBUS
}

export enum ProductType {
  SEDAN, HACHBEK, UNIVERSAL, SAMOSVAL, TIAGACH, PLATFORMA
}

export class Product {

  public productId: number;
  public area: Area;
  public laboratory: Laboratory;
  public category: ProductCategory;
  public type: ProductType;
  public created: Date;
  public modified: Date;


  constructor() {
    this.productId = null;
    this.area = null;
    this.laboratory = null;
    this.category = null;
    this.type = null;
  }

  public static update(currentProduct: Product, product: Product) {
    currentProduct.area = product.area;
    currentProduct.laboratory = product.laboratory;
    currentProduct.category = product.category;
    currentProduct.type = product.type;
    currentProduct.modified = product.modified;
  }
}
