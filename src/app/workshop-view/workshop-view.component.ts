import { Component, OnInit } from '@angular/core';
import {WorkshopService} from '../services/workshop.service';
import {Workshop} from '../model/workshop';
import {AreaService} from '../services/area.service';
import {LaboratoryService} from '../services/laboratory.service';
import {MatDialog} from '@angular/material/dialog';
import {Area} from '../model/area';
import {Laboratory} from '../model/laboratory';
import {NgModel} from '@angular/forms';
import {WorkshopEdit} from '../model/workshop-edit';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';

@Component({
  selector: 'app-workshop-view',
  templateUrl: './workshop-view.component.html',
  styleUrls: ['./workshop-view.component.css']
})
export class WorkshopViewComponent implements OnInit {

  constructor(private workshopService: WorkshopService, private areaService: AreaService, private laboratoryService: LaboratoryService,
              public dialog: MatDialog) { }

  workshops: Workshop [] = [];

  newDefinition: string = '';
  addWorkshopEvent: boolean = false;
  isWorkshopDataChanged: boolean = false;

  //  Area values
  areaList: Area [] = [];

  //  Laboratory values
  laboratoryList: Laboratory [] = [];

  ngOnInit(): void {
    this.loadAllWorkshops();
  }

  // -------------------------------------
  // Workshop methods
  // -------------------------------------

  loadAllWorkshops() {
    this.workshopService.loadAllWorkshops()
      .subscribe((data: []) => {
        this.workshops = data;
        console.log(this.workshops);
      })
  }

  addWorkshop() {
    this.addWorkshopEvent = true;
    console.log('Add Workshop event');
  }

  createWorkshop(workshopDefinition: NgModel) {
    console.log('Create Workshop definition: ' + workshopDefinition.model);
    let workshopEdit: WorkshopEdit = new WorkshopEdit();
    workshopEdit.definition = workshopDefinition.model;

    this.workshopService.createNewWorkshop(workshopEdit)
      .subscribe(
        (data: Workshop) => {
          this.workshops.push(data)
        },
        error => console.log(error)
      );

    // Clear values
    this.newDefinition = '';
    this.addWorkshopEvent = false;
  }

  saveWorkshop(workshop: Workshop) {
    if (this.isWorkshopDataChanged) {
      console.log('Save Workshop id: ' + workshop.workshopId);
      let workshopEdit: WorkshopEdit = new WorkshopEdit();
      workshopEdit.update(workshop);

      this.workshopService.saveWorkshop(workshopEdit)
        .subscribe(
          (data: Workshop) => {
            let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
            Workshop.update(currentWorkshop, data);
            this.isWorkshopDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  deleteWorkshop(workshop: Workshop) {
    this.workshopService.deleteWorkshop(workshop.workshopId)
      .subscribe(
        (data) => {
          this.workshops = this.workshops.filter(value => value.workshopId !== workshop.workshopId);
          console.log('Workshop id: ' + workshop.workshopId + ' is deleted');
          this.isWorkshopDataChanged = false;
        },
        error => console.log(error)
      );
  }

  cancelWorkshop(workshop: Workshop) {
    console.log('Cancel Workshop id: ' + workshop.workshopId);
    if (this.isWorkshopDataChanged)
      this.onAfterCollapse(workshop);
  }

  onAfterCollapse(workshop: Workshop) {
    console.log('OnAfterCollapse event, Workshop id: ' + workshop.workshopId);
    if (this.isWorkshopDataChanged) {
      console.log('The Workshop Data changed, clear changes for Workshop id: ' + workshop.workshopId);
      this.workshopService.loadWorkshopById(workshop.workshopId)
        .subscribe(
          (data: Workshop) => {
            let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
            Workshop.update(currentWorkshop, data);
            this.isWorkshopDataChanged = false;
          },
          error => console.log(error)
        );
    }

  }

  // -------------------------------------
  // Area methods
  // -------------------------------------

  addAreaEvent(workshop: Workshop) {
    console.log('AddWorkshopEvent enter');
    this.areaService.loadAllAreas()
      .subscribe(
        (data: Area[]) => {
          this.areaList = data;
          let selectData: SelectData [] = [];
          this.areaList.forEach(value => {
            let viewValue: string = 'Id: ' + value.areaId;
            let disableValue: boolean = false;

            if (value.workshop !== undefined && value.workshop !== null)
              disableValue = true;

            if (value.definition !== undefined)
              viewValue += ', ' + value.definition;

            selectData.push(new SelectDataImpl(value.areaId, viewValue, disableValue));
          });
          this.openAreaDialog(workshop, selectData);
        },
        error => console.log(error)
      );
  }

  openAreaDialog(workshop: Workshop, data: SelectData[]): void {
    console.log('Open Dialog for Workshop id: ' + workshop.workshopId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
        result.forEach(areaId => {
          let area: Area = this.areaList.find(value => value.areaId === areaId);
          if (currentWorkshop.areas === undefined)
            currentWorkshop.areas = [];
          currentWorkshop.areas.push(area);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isWorkshopDataChanged = true;
      });
  }

  deleteAreaEvent(workshop: Workshop, area: Area) {
    console.log('DeleteAreaEvent, Workshop id: ' + workshop.workshopId + ', Area id: ' + area.areaId);
    let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
    if (currentWorkshop.areas === undefined || currentWorkshop.areas.length === 0)
      return;
    currentWorkshop.areas = currentWorkshop.areas.filter(value => value.areaId !== area.areaId);
    // Update this.isAreaDataChanged value
    this.isWorkshopDataChanged = true;
  }

  // -------------------------------------
  // Laboratory methods
  // -------------------------------------

  addLaboratoryEvent(workshop: Workshop) {
    console.log('AddWorkshopEvent enter');
    this.laboratoryService.loadAllLaboratories()
      .subscribe(
        (data: Laboratory[]) => {
          this.laboratoryList = data;
          let selectData: SelectData [] = [];
          this.laboratoryList.forEach(value => {
            let viewValue: string = 'Id: ' + value.laboratoryId;
            let disableValue: boolean = false;

            if (value.definition !== undefined) {
              viewValue += ', ' + value.definition;
            }

            selectData.push(new SelectDataImpl(value.laboratoryId, viewValue, disableValue));
          });
          this.openLaboratoryDialog(workshop, selectData);
        },
        error => console.log(error)
      );
  }

  openLaboratoryDialog(workshop: Workshop, data: SelectData[]): void {
    console.log('Open Dialog for Workshop id: ' + workshop.workshopId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
        result.forEach(laboratoryId => {
          let laboratory: Laboratory = this.laboratoryList.find(value => value.laboratoryId === laboratoryId);
          if (currentWorkshop.laboratories === undefined)
            currentWorkshop.laboratories = [];
          currentWorkshop.laboratories.push(laboratory);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isWorkshopDataChanged = true;
      });
  }

  deleteLaboratoryEvent(workshop: Workshop, laboratory: Laboratory) {
    console.log('DeleteAreaEvent, Workshop id: ' + workshop.workshopId + ', Laboratory id: ' + laboratory.laboratoryId);
    let currentWorkshop: Workshop = this.workshops.find(value => value.workshopId === workshop.workshopId);
    if (currentWorkshop.laboratories === undefined || currentWorkshop.laboratories.length === 0)
      return;
    currentWorkshop.laboratories = currentWorkshop.laboratories.filter(value => value.laboratoryId !== laboratory.laboratoryId);
    // Update this.isAreaDataChanged value
    this.isWorkshopDataChanged = true;
  }
}
