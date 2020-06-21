import {Area} from './area';
import {Laboratory} from './laboratory';

export class LaboratoryEdit {
  public laboratoryId: number;
  public definition: string;
  public equipmentIds: number [];
  public productIds: number [];
  public workshopIds: number [];

  constructor() {
    this.laboratoryId = null;
    this.equipmentIds = [];
    this.productIds = [];
    this.workshopIds = [];
    this.definition = '';
  }

  public update(laboratory: Laboratory) {
    this.laboratoryId = laboratory.laboratoryId;
    this.definition = laboratory.definition;

    if (laboratory.equipments)
      laboratory.equipments.forEach(value => this.equipmentIds.push(value.equipmentId));

    if (laboratory.products)
      laboratory.products.forEach(value => this.productIds.push(value.productId));

    if (laboratory.workshops)
      laboratory.workshops.forEach(value => this.workshopIds.push(value.workshopId));
  }
}
