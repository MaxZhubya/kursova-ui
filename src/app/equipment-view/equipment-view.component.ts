import { Component, OnInit } from '@angular/core';
import {EquipmentService} from '../services/equipment.service';
import {Equipment, EquipmentType} from '../model/equipment';
import {NgModel} from '@angular/forms';
import {EquipmentEdit} from '../model/equipment-edit';
import {WorkerMy, WorkerMyType} from '../model/worker-my';
import {WorkerMyEdit} from '../model/worker-my-edit';

interface Type {
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-equipment-view',
  templateUrl: './equipment-view.component.html',
  styleUrls: ['./equipment-view.component.css']
})
export class EquipmentViewComponent implements OnInit {

  types: Type[] = [
    {value: '0', viewValue: 'TESTING_STAND'},
    {value: '1', viewValue: 'DEFECTIVE_CHECK'},
    {value: '2', viewValue: 'ASSEMBLY_DISASSEMBLY'}
  ];

  constructor(private equipmentService: EquipmentService) { }

  equipments: Equipment [] = [];
  newDefinition: string = '';
  newType: EquipmentType = null;

  addEquipmentEvent: boolean = false;
  editEquipmentEvent: boolean = false;
  selectedType: Type = null;

  isDataChanged: boolean = false;

  ngOnInit(): void {
    this.loadAllEquipments()
  }

  // -------------------------------------
  // Equipment methods
  // -------------------------------------

  loadAllEquipments() {
    this.equipmentService.loadAllEquipments()
      .subscribe((data: []) => {
        this.equipments = data;
        console.log(this.equipments);
      })
  }

  addEquipment() {
    this.addEquipmentEvent = true;
    console.log('Add Equipment event')
  }

  editEquipment(equipment: Equipment) {
    console.log('Edit Equipment event id: ' + equipment.equipmentId);
    this.newDefinition = equipment.definition;
    this.newType = equipment.type;
    this.setSelectedTypeValue(equipment.type);
    this.editEquipmentEvent = true;
    this.isDataChanged = true;
  }

  onTypeChange(event) {
    this.newType = event.value;
    console.log('This New Type: ' + EquipmentType[this.newType]);
  }

  createEquipment() {
    let equipmentEdit: EquipmentEdit = new EquipmentEdit();
    equipmentEdit.definition = this.newDefinition;
    equipmentEdit.equipmentType = EquipmentType[this.newType];

    this.equipmentService.createNewEquipment(equipmentEdit)
      .subscribe(
        (data: Equipment) => {
          this.equipments.push(data)
        },
        error => console.log(error)
      );

    this.clearEditValues();
    this.addEquipmentEvent = false;
  }

  deleteEquipment(equipment: Equipment) {
    this.equipmentService.deleteEquipment(equipment.equipmentId)
      .subscribe(
        (data) => {
          this.equipments = this.equipments.filter(value => value.equipmentId !== equipment.equipmentId);
          console.log('Equipment id: ' + equipment.equipmentId + ' is deleted');
          this.clearEditValues();
        },
        error => console.log(error)
      );
  }

  saveEquipment(equipment: Equipment) {
    if (this.isDataChanged) {
      console.log('Save Equipment id: ' + equipment.equipmentId);
      let equipmentEdit: EquipmentEdit = new EquipmentEdit();
      equipmentEdit.definition = this.newDefinition;
      equipmentEdit.equipmentType = EquipmentType[this.newType];
      equipmentEdit.equipmentId = equipment.equipmentId;
      if (equipment.laboratory)
        equipmentEdit.laboratoryId = equipment.laboratory.laboratoryId;

      this.equipmentService.saveEquipment(equipmentEdit)
        .subscribe(
          (data: Equipment) => {
            let currentEquipment: Equipment = this.equipments.find(value => value.equipmentId === equipment.equipmentId);
            Equipment.update(currentEquipment, data);
            this.clearEditValues();
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  cancelEquipment(equipment: Equipment) {
    console.log('Cancel Equipment id: ' + equipment.equipmentId);
    if (this.isDataChanged)
      this.onAfterCollapse(equipment);
  }

  onAfterCollapse(equipment: Equipment) {
    console.log('OnAfterCollapse event, Equipment id: ' + equipment.equipmentId);
    this.clearEditValues();
    if (this.isDataChanged) {
      console.log('The Equipment Data changed, clear changes for Equipment id: ' + equipment.equipmentId);
      this.equipmentService.loadEquipmentById(equipment.equipmentId)
        .subscribe(
          (data: Equipment) => {
            let currentEquipment: Equipment = this.equipments.find(value => value.equipmentId === equipment.equipmentId);
            Equipment.update(currentEquipment, data);
            // Update isDataChanged value top false
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  clearEditValues() {
    this.editEquipmentEvent = false;
    this.newDefinition = '';
    this.newType = null;
    this.selectedType = null;
  }

  setSelectedTypeValue(type: EquipmentType) {
    this.selectedType = {
      value: EquipmentType[type].toString(),
      viewValue: type.toString()
    }
  }

}
