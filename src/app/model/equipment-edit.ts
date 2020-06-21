import {EquipmentType} from './equipment';

export class EquipmentEdit {
  public equipmentId: number;
  public equipmentType: string;
  public definition: string;
  public laboratoryId: number;

  constructor() {
    this.equipmentId = null;
    this.equipmentType = '';
    this.definition = '';
    this.laboratoryId = null;
  }

}
