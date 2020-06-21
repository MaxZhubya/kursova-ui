import {Workshop} from './workshop';

export class WorkshopEdit {

  public workshopId: number;
  public definition: string;
  public areaIds: number [];
  public laboratoryIds: number [];

  constructor() {
    this.workshopId = null;
    this.definition = '';
    this.areaIds = [];
    this.laboratoryIds = [];
  }

  public update(workshop: Workshop) {
    this.workshopId = workshop.workshopId;
    this.definition = workshop.definition;

    if (workshop.areas)
      workshop.areas.forEach(value => this.areaIds.push(value.areaId));

    if (workshop.laboratories)
      workshop.laboratories.forEach(value => this.laboratoryIds.push(value.laboratoryId));
  }

}
