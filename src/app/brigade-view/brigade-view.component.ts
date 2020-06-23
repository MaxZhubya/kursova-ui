import { Component, OnInit } from '@angular/core';
import {BrigadeService} from '../services/brigade.service';
import {Brigade} from '../model/brigade';
import {WorkerMy} from '../model/worker-my';
import {NgModel} from '@angular/forms';
import {AreaEdit} from '../model/area-edit';
import {Area} from '../model/area';
import {MatDialog} from '@angular/material/dialog';
import {BrigadeEdit} from '../model/brigade-edit';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';
import {WorkerMyService} from '../services/worker-my.service';

@Component({
  selector: 'app-brigadeview',
  templateUrl: './brigade-view.component.html',
  styleUrls: ['./brigade-view.component.css']
})
export class BrigadeViewComponent implements OnInit {

  constructor(private brigadeService: BrigadeService, private workerService: WorkerMyService, public dialog: MatDialog) { }

  brigades: Brigade [] = [];

  isBrigadeDataChanged: boolean = false;
  addBrigadeEvent: boolean = false;

  //  Worker values
  workerList: WorkerMy [] = [];

  ngOnInit(): void {
    this.loadAllBrigades();
  }

  // -------------------------------------
  // Brigade methods
  // -------------------------------------

  loadAllBrigades() {
    this.brigadeService.loadAllBrigades()
      .subscribe((data: []) => {
        this.brigades = data;
      console.log(this.brigades);
    })
  }

  addBrigade() {
    this.addBrigadeEvent = true;
    console.log('Add Brigade event');
  }

  createBrigade() {
    console.log('Create Brigade');
    let brigadeEdit: BrigadeEdit = new BrigadeEdit();

    this.brigadeService.createNewBrigade(brigadeEdit)
      .subscribe(
        (data: Brigade) => {
          this.brigades.push(data)
        },
        error => console.log(error)
      );

    // Clear values
    this.addBrigadeEvent = false;
  }

  saveBrigade(brigade: Brigade) {
    if (this.isBrigadeDataChanged) {
      console.log('Save Brigade id: ' + brigade.brigadeId);
      let brigadeEdit: BrigadeEdit = new BrigadeEdit();
      brigadeEdit.update(brigade);

      this.brigadeService.saveBrigade(brigadeEdit)
        .subscribe(
          (data: Brigade) => {
            let currentBrigade: Brigade = this.brigades.find(value => value.brigadeId === brigade.brigadeId);
            Brigade.update(currentBrigade, data);
            this.isBrigadeDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  deleteBrigade(brigade: Brigade) {
    this.brigadeService.deleteBrigade(brigade.brigadeId)
      .subscribe(
        (data) => {
          this.brigades = this.brigades.filter(value => value.brigadeId !== brigade.brigadeId);
          console.log('Brigade id: ' + brigade.brigadeId + ' is deleted');
          this.isBrigadeDataChanged = false;
        },
        error => console.log(error)
      );
  }

  cancelBrigade(brigade: Brigade) {
    console.log('Cancel Brigade id: ' + brigade.brigadeId);
    if (this.isBrigadeDataChanged)
      this.onAfterCollapse(brigade);
  }

  onAfterCollapse(brigade: Brigade) {
    console.log('OnAfterCollapse event, Brigade id: ' + brigade.brigadeId);
    if (this.isBrigadeDataChanged) {
      console.log('The Brigade Data changed, clear changes for Brigade id: ' + brigade.brigadeId);
      this.brigadeService.loadBrigadeById(brigade.brigadeId)
        .subscribe(
          (data: Brigade) => {
            let currentBrigade: Brigade = this.brigades.find(value => value.brigadeId === brigade.brigadeId);
            Brigade.update(currentBrigade, data);
            this.isBrigadeDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  // -------------------------------------
  // Brigade methods
  // -------------------------------------

  addWorkerEvent(brigade: Brigade) {
    console.log('AddBrigadeEvent enter');
    this.workerService.loadAllWorkers()
      .subscribe(
        (data: WorkerMy[]) => {
          this.workerList = data;
          let selectData: SelectData [] = [];
          this.workerList.forEach(value => {
            let viewValue: string = 'Id: ' + value.workerId + ', ' + value.name + ' - ' + value.type;
            let disableValue: boolean = false;

            // Check whether current object already contains this item
            if (brigade.workers !== undefined
              && brigade.workers.find(item => item.workerId === value.workerId) !== undefined) {
              disableValue = true;
            }

            if (value.brigade !== undefined && value.brigade !== null) {
              disableValue = true;
              viewValue += ' : ' + value.brigade.brigadeId;
            }

            selectData.push(new SelectDataImpl(value.workerId, viewValue, disableValue));
          });
          this.openWorkerDialog(brigade, selectData);
        },
        error => console.log(error)
      );
  }

  openWorkerDialog(brigade: Brigade, data: SelectData[]): void {
    console.log('Open Dialog for Brigade id: ' + brigade.brigadeId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '450px',
      data: { "selectedDataList": data, "isMultiple": true, "title": "Workers" }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentBrigade: Brigade = this.brigades.find(value => value.brigadeId === brigade.brigadeId);
        result.forEach(workerId => {
          let worker: WorkerMy = this.workerList.find(value => value.workerId === workerId);
          if (currentBrigade.workers === undefined)
            currentBrigade.workers = [];
          currentBrigade.workers.push(worker);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isBrigadeDataChanged = true;
      });
  }

  deleteWorkerEvent(brigade: Brigade, worker: WorkerMy) {
    console.log('DeleteWorkerEvent, Brigade id: ' + brigade.brigadeId + ', Worker id: ' + worker.workerId);
    let currentBrigade: Brigade = this.brigades.find(value => value.brigadeId === brigade.brigadeId);
    if (currentBrigade.workers === undefined || currentBrigade.workers.length === 0)
      return;
    currentBrigade.workers = currentBrigade.workers.filter(value => value.workerId !== worker.workerId);
    // Update this.isAreaDataChanged value
    this.isBrigadeDataChanged = true;
  }
}
