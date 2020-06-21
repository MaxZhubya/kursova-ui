import {Area} from './area';
import {Laboratory} from './laboratory';

export class Workshop {

  public workshopId: number;
  public areas: Array<Area>;
  public laboratories: Array<Laboratory>;
  public definition: string;
  public created: Date;
  public modified: Date;

  constructor() {
    this.workshopId = null;
    this.areas = [];
    this.laboratories = [];
    this.definition = '';
  }

  public static update(currentWorkshop: Workshop, workshop: Workshop) {

    currentWorkshop.areas = workshop.areas;
    if (currentWorkshop.areas !== undefined && currentWorkshop.areas !== null)
      currentWorkshop.areas.sort((b, a) => b.areaId - a.areaId);

    currentWorkshop.laboratories = workshop.laboratories;
    if (currentWorkshop.laboratories !== undefined && currentWorkshop.laboratories !== null)
      currentWorkshop.laboratories.sort((b, a) => b.laboratoryId - a.laboratoryId);

    currentWorkshop.definition = workshop.definition;
    currentWorkshop.modified = workshop.modified;
  }
}
