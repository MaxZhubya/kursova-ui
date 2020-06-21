import {Laboratory} from './laboratory';

export enum EquipmentType {
  TESTING_STAND, DEFECTIVE_CHECK, ASSEMBLY_DISASSEMBLY
}

export class Equipment {

  public equipmentId: number;
  public laboratory: Laboratory;
  public type: EquipmentType;
  public definition: string;
  public created: Date;
  public modified: Date;

  constructor() {
    this.equipmentId = null;
    this.laboratory = null;
    this.type = null;
    this.definition = '';
  }

  public static update(currentEquipment: Equipment, equipment: Equipment) {
    currentEquipment.laboratory = equipment.laboratory;
    currentEquipment.type = equipment.type;
    currentEquipment.definition = equipment.definition;
    currentEquipment.modified = equipment.modified;
  }
}
