import { Component, OnInit } from '@angular/core';
import {TechPersonalService} from '../services/techPersonalService';
import {TechnicalPersonal, TechPersonalType} from '../model/technicalPersonal';
import {NgModel} from '@angular/forms';
import {TechnicalPersonalEdit} from '../model/technicalPersonal-edit';
import {TeamOfAreaBoss} from '../model/teamOfAreaBoss';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';
import {Area} from '../model/area';
import {TeamOfAreaBossService} from '../services/teamOfAreaBoss.service';
import {MatDialog} from '@angular/material/dialog';
import {TeamOfAreaBossEdit} from '../model/teamOfAreaBoss-edit';

interface Type {
  value: string;
  viewValue: string
}

@Component({
  selector: 'app-technical-personal',
  templateUrl: './technical-personal-view.component.html',
  styleUrls: ['./technical-personal-view.component.css']
})
export class TechnicalPersonalViewComponent implements OnInit {

  types: Type[] = [
    {value: '0', viewValue: 'ENGINEER'},
    {value: '1', viewValue: 'TECHNOLOG'},
    {value: '2', viewValue: 'TECHNIC'},
    {value: '3', viewValue: 'TEAM_OF_AREA_BOSS'},
    {value: '4', viewValue: 'WORKSHOP_BOSS'},
    {value: '5', viewValue: 'MASTER'}
  ];

  constructor(private techService: TechPersonalService, private teamService: TeamOfAreaBossService, public dialog: MatDialog) { }

  personals: TechnicalPersonal [] = [];

  newType: TechPersonalType = null;
  newName: string = '';
  newDescription: string = '';

  isDataChanged: boolean = false;

  addPersonalEvent: boolean = false;
  editPersonalEvent: boolean = false;
  selectedType: Type = null;

  // For TeamOfAreaBoss
  teams: TeamOfAreaBoss [] = [];

  ngOnInit(): void {
    this.loadAllTechnicalPersonals();
  }

  // -------------------------------------
  // TechnicalPersonal methods
  // -------------------------------------

  loadAllTechnicalPersonals() {
    this.techService.loadAllTechnicalPersonals()
      .subscribe((data: []) => {
        this.personals = data;
        console.log(this.personals);
      })
  }

  addTechnicalPersonal() {
    this.addPersonalEvent = true;
    console.log('Add TechnicalPersonal event');
  }

  editTechnicalPersonal(personal: TechnicalPersonal) {
    console.log('Edit TechnicalPersonal event id: ' + personal.techPersonalId);
    this.newName = personal.personalName;
    this.newType = personal.personalType;
    this.newDescription = personal.description;
    this.setSelectedTypeValue(personal.personalType);
    this.editPersonalEvent = true;
    this.isDataChanged = true;
  }

  onTypeChange(event) {
    this.newType = event.value;
    console.log('This New type ' + TechPersonalType[this.newType]);
  }

  createTechnicalPersonal() {
    let techPersonalEdit: TechnicalPersonalEdit = new TechnicalPersonalEdit();
    techPersonalEdit.name = this.newName;
    techPersonalEdit.description = this.newDescription;
    techPersonalEdit.type = TechPersonalType[this.newType];

    this.techService.createNewTechnicalPersonal(techPersonalEdit)
      .subscribe(
        (data: TechnicalPersonal) => {
          this.personals.push(data)
        },
        error => console.log(error)
      );

    this.clearEditValues();
    this.addPersonalEvent = false;
  }

  deletePersonal(techPersonal: TechnicalPersonal) {
    this.techService.deleteTechnicalPersonal(techPersonal.techPersonalId)
      .subscribe(
        (data) => {
          this.personals = this.personals.filter(value => value.techPersonalId !== techPersonal.techPersonalId);
          console.log('TechnicalPersonal id: ' + techPersonal.techPersonalId + ' is deleted');
          this.clearEditValues();
        },
        error => console.log(error)
      );
  }

  savePersonal(techPersonal: TechnicalPersonal) {
    if (this.isDataChanged) {
      console.log('Save TechnicalPersonal id: ' + techPersonal.techPersonalId);
      let personalEdit: TechnicalPersonalEdit = new TechnicalPersonalEdit();
      personalEdit.name = this.newName;
      personalEdit.type = TechPersonalType[this.newType];
      personalEdit.description = this.newDescription;
      personalEdit.techPersonalId = techPersonal.techPersonalId;
      if (techPersonal.teamOfAreaBoss)
        personalEdit.teamOfAreaBossId = techPersonal.teamOfAreaBoss.teamId;

      this.techService.saveTechnicalPersonal(personalEdit)
        .subscribe(
          (data: TechnicalPersonal) => {
            let currentPersonal: TechnicalPersonal = this.personals.find(value => value.techPersonalId === techPersonal.techPersonalId);
            TechnicalPersonal.update(currentPersonal, data);
            this.clearEditValues();
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  cancelPersonal(techPersonal: TechnicalPersonal) {
    console.log('Cancel Personal id: ' + techPersonal.techPersonalId);
    if (this.isDataChanged)
      this.onAfterCollapse(techPersonal);
  }

  onAfterCollapse(techPersonal: TechnicalPersonal) {
    console.log('OnAfterCollapse event, Personal id: ' + techPersonal.techPersonalId);
    if (this.isDataChanged) {
      console.log('The Personal Data changed, clear changes for Team id: ' + techPersonal.techPersonalId);
      this.techService.loadTechnicalPersonalById(techPersonal.techPersonalId)
        .subscribe(
          (data: TechnicalPersonal) => {
            let currentPersonal: TechnicalPersonal = this.personals.find(value => value.techPersonalId === techPersonal.techPersonalId);
            TechnicalPersonal.update(currentPersonal, data);
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
    this.newDescription = '';
    this.editPersonalEvent = false;
  }

  setSelectedTypeValue(type: TechPersonalType) {
    this.selectedType = {
      value: TechPersonalType[type].toString(),
      viewValue: type.toString()
    }
  }

}
