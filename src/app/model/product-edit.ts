import {Product, ProductCategory, ProductType} from './product';

export class ProductEdit {
  public productId: number;
  public category: string;
  public type: string;
  public areaId: number;
  public laboratoryId: number;

  constructor() {
    this.productId = null;
    this.category = null;
    this.type = null;
    this.areaId = null;
    this.laboratoryId = null;
  }

  public update(product: Product) {
    this.productId = product.productId;

    if (product.category)
      this.category = ProductCategory[product.category];

    if (product.type)
      this.type = ProductType[product.type];

    if (product.area)
      this.areaId = product.area.areaId;

    if (product.laboratory)
      this.laboratoryId = product.laboratory.laboratoryId;
  }
}
