import { Component, OnInit } from '@angular/core';
import {WorkerMyService} from '../services/worker-my.service';
import {WorkerMy, WorkerMyType} from '../model/worker-my';
import {WorkerMyEdit} from '../model/worker-my-edit';

interface Type {
  value: string,
  viewValue: string;
}

@Component({
  selector: 'app-worker-my-view',
  templateUrl: './worker-my-view.component.html',
  styleUrls: ['./worker-my-view.component.css']
})
export class WorkerMyViewComponent implements OnInit {

  types: Type[] = [
    {value: '0', viewValue: 'SBORSCHIK'},
    {value: '1', viewValue: 'TOKAR'},
    {value: '2', viewValue: 'SVARSCHIK'},
    {value: '3', viewValue: 'SLUSAR'},
    {value: '4', viewValue: 'BRIGADIER'}
  ];

  constructor(private workerService: WorkerMyService) { }

  workers: WorkerMy [] = [];
  newType: WorkerMyType = null;
  newName: string = '';

  addWorkerEvent: boolean = false;
  editWorkerEvent: boolean = false;
  selectedType: Type = null;

  isDataChanged: boolean = false;

  ngOnInit(): void {
    this.loadAllWorkers()
  }

  // -------------------------------------
  // Worker methods
  // -------------------------------------

  loadAllWorkers() {
    this.workerService.loadAllWorkers()
      .subscribe((data: []) => {
        this.workers = data;
        console.log(this.workers);
      })
  }

  addWorker() {
    this.addWorkerEvent = true;
    console.log('Add worker event');
  }

  editWorker(worker: WorkerMy) {
    console.log('Edit Worker event id: ' + worker.workerId);
    this.newName = worker.name;
    this.newType = worker.type;
    this.setSelectedTypeValue(worker.type);
    this.editWorkerEvent = true;
    this.isDataChanged = true;
  }

  onTypeChange(event) {
    this.newType = event.value;
    console.log('This New type ' + WorkerMyType[this.newType]);
  }

  createWorker() {
    let workerEdit: WorkerMyEdit = new WorkerMyEdit();
    workerEdit.name = this.newName;
    workerEdit.type = WorkerMyType[this.newType];

    this.workerService.createNewWorker(workerEdit)
      .subscribe(
        (data: WorkerMy) => {
          this.workers.push(data)
        },
        error => console.log(error)
      );

    this.clearEditValues();
    this.addWorkerEvent = false;
  }

  deleteWorker(worker: WorkerMy) {
    this.workerService.deleteWorker(worker.workerId)
      .subscribe(
        (data) => {
          this.workers = this.workers.filter(value => value.workerId !== worker.workerId);
          console.log('Worker id: ' + worker.workerId + ' is deleted');
          this.clearEditValues();
        },
        error => console.log(error)
      );
  }

  saveWorker(worker: WorkerMy) {
    if (this.isDataChanged) {
      console.log('Save Worker id: ' + worker.workerId);
      let workerEdit: WorkerMyEdit = new WorkerMyEdit();
      workerEdit.name = this.newName;
      workerEdit.type = WorkerMyType[this.newType];
      workerEdit.workerId = worker.workerId;
      if (worker.brigade)
        workerEdit.brigadeId = worker.brigade.brigadeId;

      this.workerService.saveWorker(workerEdit)
        .subscribe(
          (data: WorkerMy) => {
            let currentWorker: WorkerMy = this.workers.find(value => value.workerId === worker.workerId);
            WorkerMy.update(currentWorker, data);
            this.clearEditValues();
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  cancelWorker(worker: WorkerMy) {
    console.log('Cancel Worker id: ' + worker.workerId);
    if (this.isDataChanged)
      this.onAfterCollapse(worker);
  }

  onAfterCollapse(worker: WorkerMy) {
    console.log('OnAfterCollapse event, Worker id: ' + worker.workerId);
    if (this.isDataChanged) {
      console.log('The Worker Data changed, clear changes for Worker id: ' + worker.workerId);
      this.workerService.loadWorkerById(worker.workerId)
        .subscribe(
          (data: WorkerMy) => {
            let currentWorker: WorkerMy = this.workers.find(value => value.workerId === worker.workerId);
            WorkerMy.update(currentWorker, data);
            this.clearEditValues();
            // Update isDataChanged value top false
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  clearEditValues() {
    this.newName = '';
    this.newType = null;
    this.editWorkerEvent = false;
  }

  setSelectedTypeValue(type: WorkerMyType) {
    this.selectedType = {
      value: WorkerMyType[type].toString(),
      viewValue: type.toString()
    }
  }
}
