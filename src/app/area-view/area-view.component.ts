import { Component, OnInit } from '@angular/core';
import {AreaService} from '../services/area.service';
import {Area} from '../model/area';
import {NgModel} from '@angular/forms';
import {AreaEdit} from '../model/area-edit';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {TeamOfAreaBossService} from '../services/teamOfAreaBoss.service';
import {TeamOfAreaBoss} from '../model/teamOfAreaBoss';
import {MatDialog} from '@angular/material/dialog';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';
import {TechnicalPersonal} from '../model/technicalPersonal';
import {BrigadeService} from '../services/brigade.service';
import {ProductService} from '../services/product.service';
import {WorkshopService} from '../services/workshop.service';
import {Brigade} from '../model/brigade';
import {Product} from '../model/product';
import {Workshop} from '../model/workshop';

@Component({
  selector: 'app-areaview',
  templateUrl: './area-view.component.html',
  styleUrls: ['./area-view.component.css']
})
export class AreaViewComponent implements OnInit {

  constructor(private areaService: AreaService, private teamOfAreaBossService: TeamOfAreaBossService, private brigadeService: BrigadeService,
              private productService: ProductService, private workshopService: WorkshopService, public dialog: MatDialog) { }

  areas: Area [] = [];
  newAreaDescription: string = '';
  addAreaEvent: boolean = false;

  isAreaDataChanged: boolean = false;

  // TeamOfAreaBoss values
  teamOfAreaBossList: TeamOfAreaBoss [] = [];

  // Brigade values
  brigadeList: Brigade [] = [];

  // Product values
  productList: Product [] = [];

  // Workshop values
  workshopList: Workshop [] = [];

  ngOnInit(): void {
    this.loadAllAreas();
  }

  // -------------------------------------
  // Area methods
  // -------------------------------------

  loadAllAreas() {
    this.areaService.loadAllAreas()
      .subscribe((data: []) => {
        this.areas = data;
      console.log(this.areas);
    });
  }

  addArea() {
    this.addAreaEvent = true;
    console.log('Add Area event');
  }

  createArea(areaDescription: NgModel) {
    console.log('Create Area description: ' + areaDescription.model);
    let areaEdit: AreaEdit = new AreaEdit();
    areaEdit.areaDefinition = areaDescription.model;

    this.areaService.createNewArea(areaEdit)
      .subscribe(
        (data: Area) => {
          this.areas.push(data)
        },
        error => console.log(error)
      );

    // Clear values
    this.newAreaDescription = '';
    this.addAreaEvent = false;
  }

  saveArea(area: Area) {
    if (this.isAreaDataChanged) {
      console.log('Save Area id: ' + area.areaId);
      let areaEdit: AreaEdit = new AreaEdit();
      areaEdit.update(area);

      this.areaService.saveArea(areaEdit)
        .subscribe(
          (data: Area) => {
            let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
            Area.updateArea(currentArea, data);
            this.isAreaDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  deleteArea(area: Area) {
    this.areaService.deleteArea(area.areaId)
      .subscribe(
        (data) => {
          this.areas = this.areas.filter(value => value.areaId !== area.areaId);
          console.log('Area id: ' + area.areaId + ' is deleted');
          this.isAreaDataChanged = false;
        },
        error => console.log(error)
      );
  }

  cancelArea(area: Area) {
    console.log('Cancel Area id: ' + area.areaId);
    if (this.isAreaDataChanged)
      this.onAfterCollapse(area);
  }

  onAfterCollapse(area: Area) {
    console.log('OnAfterCollapse event, Area id: ' + area.areaId);
    if (this.isAreaDataChanged) {
      console.log('The Area Data changed, clear changes for Area id: ' + area.areaId);
      this.areaService.loadAreaById(area.areaId)
        .subscribe(
          (data: Area) => {
            let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
            Area.updateArea(currentArea, data);
            this.isAreaDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  // -------------------------------------
  // TeamOfAreaBoss methods
  // -------------------------------------

  addTeamOfAreaBossEvent(area: Area) {
    console.log('AddTeamOfAreaBossEvent enter');
    this.teamOfAreaBossService.loadAllTeams()
      .subscribe(
        (data: []) => {
          this.teamOfAreaBossList = data;
          let selectData: SelectData [] = [];
          this.teamOfAreaBossList.forEach(value => {
            let viewValue: string = 'Team id: ' + value.teamId;
            let disableValue: boolean = false;
            if (value.area !== undefined) {
              disableValue = true;
              viewValue = viewValue + '  [ Area id: ' + value.area.areaId + ' ]';
            }
            selectData.push(new SelectDataImpl(value.teamId, viewValue, disableValue));
          });
          this.openTeamOfAreaBossDialog(area, selectData);
        },
        error => console.log(error)
      );
  }

  openTeamOfAreaBossDialog(area: Area, data: SelectData[]): void {
    console.log('Open Dialog for Area id: ' + area.areaId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": false }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let teamId: number = result[0];
        let teamOfAreaBoss: TeamOfAreaBoss = this.teamOfAreaBossList.find(value => value.teamId === teamId);
        let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
        currentArea.teamOfAreaBoss = teamOfAreaBoss;
        // Update this.isAreaDataChanged value
        this.isAreaDataChanged = true;
        this.dialog.ngOnDestroy();
    });
  }

  deleteTeamOfAreaBossEvent(area: Area) {
    console.log('DeleteTeamOfAreaBossEvent, Area id: ' + area.areaId);
    let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
    currentArea.teamOfAreaBoss = undefined;
    // Update this.isAreaDataChanged value
    this.isAreaDataChanged = true;
  }

  // -------------------------------------
  // Brigade methods
  // -------------------------------------

  addBrigadeEvent(area: Area) {
    console.log('AddBrigadeEvent enter');
    this.brigadeService.loadAllBrigades()
      .subscribe(
        (data: Brigade[]) => {
          this.brigadeList = data;
          let selectData: SelectData [] = [];
          this.brigadeList.forEach(value => {
            let viewValue: string = 'Id: ' + value.brigadeId;
            let disableValue: boolean = false;
            if (value.area !== undefined) {
              disableValue = true;
              viewValue += ', Area id: ' + value.area.areaId;
            }
            selectData.push(new SelectDataImpl(value.brigadeId, viewValue, disableValue));
          });
          this.openBrigadeDialog(area, selectData);
        },
        error => console.log(error)
      );
  }

  openBrigadeDialog(area: Area, data: SelectData[]): void {
    console.log('Open Dialog for Area id: ' + area.areaId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
        result.forEach(brigadeId => {
          let brigade: Brigade = this.brigadeList.find(value => value.brigadeId === brigadeId);
          if (currentArea.brigades === undefined)
            currentArea.brigades = [];
          currentArea.brigades.push(brigade);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isAreaDataChanged = true;
      });
  }

  deleteBrigadeEvent(area: Area, brigade: Brigade) {
    console.log('DeleteBrigadeEvent, Area id: ' + area.areaId + ', Brigade id: ' + brigade.brigadeId);
    let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
    if (currentArea.brigades === undefined || currentArea.brigades.length === 0)
      return;
    currentArea.brigades = currentArea.brigades.filter(value => value.brigadeId !== brigade.brigadeId);
    // Update this.isAreaDataChanged value
    this.isAreaDataChanged = true;
  }

  // -------------------------------------
  // Product methods
  // -------------------------------------

  addProductEvent(area: Area) {
    console.log('AddProductEvent enter');
    this.productService.loadAllProducts()
      .subscribe(
        (data: Product[]) => {
          this.productList = data;
          let selectData: SelectData [] = [];
          this.productList.forEach(value => {
            let viewValue: string = 'Id: ' + value.productId;
            let disableValue: boolean = false;
            if (value.area !== undefined) {
              disableValue = true;
              viewValue += ', Area id: ' + value.area.areaId;
            }
            selectData.push(new SelectDataImpl(value.productId, viewValue, disableValue));
          });
          this.openProductDialog(area, selectData);
        },
        error => console.log(error)
      );
  }

  openProductDialog(area: Area, data: SelectData[]): void {
    console.log('Open Dialog for Area id: ' + area.areaId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": true }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
        result.forEach(productId => {
          let product: Product = this.productList.find(value => value.productId === productId);
          if (currentArea.products === undefined)
            currentArea.products = [];
          currentArea.products.push(product);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isAreaDataChanged = true;
      });
  }

  deleteProductEvent(area: Area, product: Product) {
    console.log('DeleteProductEvent, Area id: ' + area.areaId + ', Product id: ' + product.productId);
    let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
    if (currentArea.products === undefined || currentArea.products.length === 0)
      return;
    currentArea.products = currentArea.products.filter(value => value.productId !== product.productId);
    // Update this.isAreaDataChanged value
    this.isAreaDataChanged = true;
  }

  // -------------------------------------
  // Workshop methods
  // -------------------------------------

  addWorkshopEvent(area: Area) {
    console.log('AddWorkshopEvent enter');
    this.workshopService.loadAllWorkshops()
      .subscribe(
        (data: Workshop[]) => {
          this.workshopList = data;
          let selectData: SelectData [] = [];
          this.workshopList.forEach(value => {
            let viewValue: string = 'Id: ' + value.workshopId;
            let disableValue: boolean = false;
            if (value.definition !== undefined && value.definition.length !== 0) {
              disableValue = true;
              viewValue += ', definition: ' + value.definition;
            }
            selectData.push(new SelectDataImpl(value.workshopId, viewValue, disableValue));
          });
          this.openWorkshopDialog(area, selectData);
        },
        error => console.log(error)
      );
  }

  openWorkshopDialog(area: Area, data: SelectData[]): void {
    console.log('Open Dialog for Area id: ' + area.areaId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": false }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
        result.forEach(workshopId => {
          let workshop: Workshop = this.workshopList.find(value => value.workshopId === workshopId);
          if (currentArea.workshop === undefined)
            currentArea.workshop = null;
          currentArea.workshop = area.workshop;
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isAreaDataChanged = true;
      });
  }

  deleteWorkshopEvent(area: Area) {
    console.log('DeleteWorkshopEvent, Area id: ' + area.areaId + ', Workshop id: ' + area.workshop.workshopId);
    let currentArea: Area = this.areas.find(value => value.areaId === area.areaId);
    if (currentArea.workshop === undefined || currentArea.workshop === null)
      return;
    currentArea.workshop.workshopId = area.workshop.workshopId;
    // Update this.isAreaDataChanged value
    this.isAreaDataChanged = true;
  }

}
