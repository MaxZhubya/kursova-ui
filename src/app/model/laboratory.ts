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

  constructor() {
    this.laboratoryId = null;
    this.equipments = [];
    this.products = [];
    this.workshops = [];
    this.definition = '';
  }

  public static update(currentLaboratory: Laboratory, laboratory: Laboratory) {

    currentLaboratory.equipments = laboratory.equipments;
    if (currentLaboratory.equipments !== undefined && currentLaboratory.equipments !== null)
      currentLaboratory.equipments.sort((b, a) => b.equipmentId - a.equipmentId);

    currentLaboratory.products = laboratory.products;
    if (currentLaboratory.products !== undefined && currentLaboratory.products !== null)
      currentLaboratory.products.sort((b, a) => b.productId - a.productId);

    currentLaboratory.workshops = laboratory.workshops;
    if (currentLaboratory.workshops !== undefined && currentLaboratory.workshops !== null)
      currentLaboratory.workshops.sort((b, a) => b.workshopId - a.workshopId);

    currentLaboratory.definition = laboratory.definition;
    currentLaboratory.modified = laboratory.modified;
  }
}
