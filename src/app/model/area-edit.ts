import {Area} from './area';

export class AreaEdit {

  public areaId: number;
  public areaDefinition: string;
  public teamOfAreaBoss: number;
  public brigadeIds: number [];
  public productIds: number [];
  public workshopId: number;

  constructor() {
    this.areaId = null;
    this.teamOfAreaBoss = null;
    this.brigadeIds = [];
    this.productIds = [];
    this.workshopId = null;
    this.areaDefinition = '';
  }

  public update(area: Area) {
    this.areaId = area.areaId;
    this.areaDefinition = area.definition;
    if (area.teamOfAreaBoss)
      this.teamOfAreaBoss = area.teamOfAreaBoss.teamId;
    if (area.brigades)
      area.brigades.forEach(value => this.brigadeIds.push(value.brigadeId));
    if (area.products)
      area.products.forEach(value => this.productIds.push(value.productId));
    if (area.workshop)
      this.workshopId = area.workshop.workshopId;
  }

}
