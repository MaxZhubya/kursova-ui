import {Product} from './product';
import {Equipment} from './equipment';
import {Workshop} from './workshop';


export class Laboratory {

  public laboratoryId: number;
  public equipments: Array<Equipment>;
  public products: Array<Product>;
  public workshops: Array<Workshop>;
  public definition: string;
  public created: Date;
  public modified: Date;

  constructor(laboratoryId: number, equipments: Array<Equipment>, products: Array<Product>, workshops: Array<Workshop>, definition: string, created: Date, modified: Date) {
    this.laboratoryId = laboratoryId;
    this.equipments = equipments;
    this.products = products;
    this.workshops = workshops;
    this.definition = definition;
    this.created = created;
    this.modified = modified;
  }
}
