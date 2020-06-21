import { Component, OnInit } from '@angular/core';
import {LaboratoryService} from '../services/laboratory.service';
import {Laboratory} from '../model/laboratory';

@Component({
  selector: 'app-laboratory-view',
  templateUrl: './laboratory-view.component.html',
  styleUrls: ['./laboratory-view.component.css']
})
export class LaboratoryViewComponent implements OnInit {

  constructor(private laboratoryService: LaboratoryService) { }

  laboratories: Laboratory [] = [];

  ngOnInit(): void {
    this.loadAllLaboratories()
  }

  loadAllLaboratories() {
    this.laboratoryService.loadAllLaboratories()
      .subscribe((data: []) => {
        this.laboratories = data;
        console.log(this.laboratories);
      })
  }

}
