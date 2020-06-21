import { Component, OnInit } from '@angular/core';
import {LaboratoryService} from '../services/laboratory.service';
import {Laboratory} from '../model/laboratory';
import {EquipmentService} from '../services/equipment.service';
import {ProductService} from '../services/product.service';
import {WorkshopService} from '../services/workshop.service';
import {MatDialog} from '@angular/material/dialog';
import {Equipment} from '../model/equipment';
import {Product} from '../model/product';
import {Workshop} from '../model/workshop';
import {NgModel} from '@angular/forms';
import {LaboratoryEdit} from '../model/laboratory-edit';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';

@Component({
  selector: 'app-laboratory-view',
  templateUrl: './laboratory-view.component.html',
  styleUrls: ['./laboratory-view.component.css']
})
export class LaboratoryViewComponent implements OnInit {

  constructor(private laboratoryService: LaboratoryService, private equipmentService: EquipmentService, private productService: ProductService,
              private workshopService: WorkshopService, private dialog: MatDialog) { }

  laboratories: Laboratory [] = [];
  newDefinition: string = '';
  addLaboratoryEvent: boolean = false;

  isDataChanged: boolean = false;

  //  Equipment values
  equipmentList: Equipment [] = [];

  //  Product values
  productList: Product [] = [];

  //  Workshop values
  workshopList: Workshop [] = [];

  ngOnInit(): void {
    this.loadAllLaboratories()
  }

  // -------------------------------------
  // Laboratory methods
  // -------------------------------------

  loadAllLaboratories() {
    this.laboratoryService.loadAllLaboratories()
      .subscribe((data: []) => {
        this.laboratories = data;
        console.log(this.laboratories);
      })
  }

  addLaboratory() {
    this.addLaboratoryEvent = true;
    console.log('Add Laboratory event');
  }

  createLaboratory(laboratoryDefinition: NgModel) {
    console.log('Create Laboratory definition: ' + laboratoryDefinition.model);
    let laboratoryEdit: LaboratoryEdit = new LaboratoryEdit();
    laboratoryEdit.definition = laboratoryDefinition.model;

    this.laboratoryService.createNewLaboratory(laboratoryEdit)
      .subscribe(
        (data: Laboratory) => {
          this.laboratories.push(data)
        },
        error => console.log(error)
      );

    // Clear values
    this.newDefinition = '';
    this.addLaboratoryEvent = false;
  }

  saveLaboratory(laboratory: Laboratory) {
    if (this.isDataChanged) {
      console.log('Save Laboratory id: ' + laboratory.laboratoryId);
      let laboratoryEdit: LaboratoryEdit = new LaboratoryEdit();
      laboratoryEdit.update(laboratory);

      this.laboratoryService.saveLaboratory(laboratoryEdit)
        .subscribe(
          (data: Laboratory) => {
            let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
            Laboratory.update(currentLaboratory, data);
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  deleteLaboratory(laboratory: Laboratory) {
    this.laboratoryService.deleteLaboratory(laboratory.laboratoryId)
      .subscribe(
        (data) => {
          this.laboratories = this.laboratories.filter(value => value.laboratoryId !== laboratory.laboratoryId);
          console.log('Laboratory id: ' + laboratory.laboratoryId + ' is deleted');
          this.isDataChanged = false;
        },
        error => console.log(error)
      );
  }

  cancelLaboratory(laboratory: Laboratory) {
    console.log('Cancel Laboratory id: ' + laboratory.laboratoryId);
    if (this.isDataChanged)
      this.onAfterCollapse(laboratory);
  }

  onAfterCollapse(laboratory: Laboratory) {
    console.log('OnAfterCollapse event, Laboratory id: ' + laboratory.laboratoryId);
    if (this.isDataChanged) {
      console.log('The Laboratory Data changed, clear changes for Laboratory id: ' + laboratory.laboratoryId);
      this.laboratoryService.loadLaboratoryById(laboratory.laboratoryId)
        .subscribe(
          (data: Laboratory) => {
            let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
            Laboratory.update(currentLaboratory, data);
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  // -------------------------------------
  // Equipment methods
  // -------------------------------------

  addEquipmentEvent(laboratory: Laboratory) {
    console.log('AddEquipmentEvent enter');
    this.equipmentService.loadAllEquipments()
      .subscribe(
        (data: Equipment[]) => {
          this.equipmentList = data;
          let selectData: SelectData [] = [];
          this.equipmentList.forEach(value => {
            let viewValue: string = 'Id: ' + value.equipmentId;
            let disableValue: boolean = false;
            if (value.laboratory !== undefined) {
              disableValue = true;
              viewValue += ', Laboratory id: ' + value.laboratory.laboratoryId;
            }
            selectData.push(new SelectDataImpl(value.equipmentId, viewValue, disableValue));
          });
          this.openEquipmentDialog(laboratory, selectData);
        },
        error => console.log(error)
      );
  }

  openEquipmentDialog(laboratory: Laboratory, data: SelectData[]): void {
    console.log('Open Dialog for Laboratory id: ' + laboratory.laboratoryId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
        result.forEach(equipmentId => {
          let equipment: Equipment = this.equipmentList.find(value => value.equipmentId === equipmentId);
          if (currentLaboratory.equipments === undefined)
            currentLaboratory.equipments = [];
          currentLaboratory.equipments.push(equipment);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isDataChanged = true;
      });
  }

  deleteEquipmentEvent(laboratory: Laboratory, equipment: Equipment) {
    console.log('DeleteEquipmentsEvent, Laboratory id: ' + laboratory.laboratoryId + ', Equipments id: ' + equipment.equipmentId);
    let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
    if (currentLaboratory.equipments === undefined || currentLaboratory.equipments.length === 0)
      return;
    currentLaboratory.equipments = currentLaboratory.equipments.filter(value => value.equipmentId !== equipment.equipmentId);
    // Update this.isAreaDataChanged value
    this.isDataChanged = true;
  }

  // -------------------------------------
  // Product methods
  // -------------------------------------

  addProductEvent(laboratory: Laboratory) {
    console.log('AddProductEvent enter');
    this.productService.loadAllProducts()
      .subscribe(
        (data: Product[]) => {
          this.productList = data;
          let selectData: SelectData [] = [];
          this.productList.forEach(value => {
            let viewValue: string = 'Id: ' + value.productId;
            let disableValue: boolean = false;
            if (value.laboratory !== undefined) {
              disableValue = true;
              viewValue += ', Laboratory id: ' + value.laboratory.laboratoryId;
            }
            selectData.push(new SelectDataImpl(value.productId, viewValue, disableValue));
          });
          this.openProductDialog(laboratory, selectData);
        },
        error => console.log(error)
      );
  }

  openProductDialog(laboratory: Laboratory, data: SelectData[]): void {
    console.log('Open Dialog for Laboratory id: ' + laboratory.laboratoryId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
        result.forEach(productId => {
          let product: Product = this.productList.find(value => value.productId === productId);
          if (currentLaboratory.products === undefined)
            currentLaboratory.products = [];
          currentLaboratory.products.push(product);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isDataChanged = true;
      });
  }

  deleteProductEvent(laboratory: Laboratory, product: Product) {
    console.log('DeleteProductEvent, Laboratory id: ' + laboratory.laboratoryId + ', Product id: ' + product.productId);
    let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
    if (currentLaboratory.products === undefined || currentLaboratory.products.length === 0)
      return;
    currentLaboratory.products = currentLaboratory.products.filter(value => value.productId !== product.productId);
    // Update this.isAreaDataChanged value
    this.isDataChanged = true;
  }

  // -------------------------------------
  // Workshop methods
  // -------------------------------------

  addWorkshopEvent(laboratory: Laboratory) {
    console.log('AddWorkshopEvent enter');
    this.workshopService.loadAllWorkshops()
      .subscribe(
        (data: Workshop[]) => {
          this.workshopList = data;
          let selectData: SelectData [] = [];
          this.workshopList.forEach(value => {
            let viewValue: string = 'Id: ' + value.workshopId;
            let disableValue: boolean = false;
            if (laboratory.workshops !== undefined
                && laboratory.workshops.find(workshop => workshop.workshopId === value.workshopId) !== undefined)
              disableValue = true;

            if (value.definition !== undefined) {
              viewValue += ', ' + value.definition;
            }
            selectData.push(new SelectDataImpl(value.workshopId, viewValue, disableValue));
          });
          this.openWorkshopDialog(laboratory, selectData);
        },
        error => console.log(error)
      );
  }

  openWorkshopDialog(laboratory: Laboratory, data: SelectData[]): void {
    console.log('Open Dialog for Laboratory id: ' + laboratory.laboratoryId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
        result.forEach(workshopId => {
          let workshop: Workshop = this.workshopList.find(value => value.workshopId === workshopId);
          if (currentLaboratory.workshops === undefined)
            currentLaboratory.workshops = [];
          currentLaboratory.workshops.push(workshop);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isDataChanged = true;
      });
  }

  deleteWorkshopEvent(laboratory: Laboratory, workshop: Workshop) {
    console.log('DeleteWorkshopEvent, Laboratory id: ' + laboratory.laboratoryId + ', Workshop id: ' + workshop.workshopId);
    let currentLaboratory: Laboratory = this.laboratories.find(value => value.laboratoryId === laboratory.laboratoryId);
    if (currentLaboratory.workshops === undefined || currentLaboratory.workshops.length === 0)
      return;
    currentLaboratory.workshops = currentLaboratory.workshops.filter(value => value.workshopId !== workshop.workshopId);
    // Update this.isAreaDataChanged value
    this.isDataChanged = true;
  }

}
