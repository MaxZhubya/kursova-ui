import { Component, OnInit } from '@angular/core';
import {TeamOfAreaBossService} from '../services/teamOfAreaBoss.service';
import {TeamOfAreaBoss} from '../model/teamOfAreaBoss';
import {TechnicalPersonal, TechPersonalType} from '../model/technicalPersonal';
import {Area} from '../model/area';
import {TeamOfAreaBossEdit} from '../model/teamOfAreaBoss-edit';
import {error} from '@angular/compiler/src/util';
import {SelectData, SelectDataImpl} from '../model/select-data';
import {SelectDialogSingleComponent} from '../select-dialog-single/select-dialog-single.component';
import {AreaService} from '../services/area.service';
import {MatDialog} from '@angular/material/dialog';
import {TechPersonalService} from '../services/techPersonalService';

@Component({
  selector: 'app-team-of-area-boss-view',
  templateUrl: './team-of-area-boss-view.component.html',
  styleUrls: ['./team-of-area-boss-view.component.css']
})
export class TeamOfAreaBossViewComponent implements OnInit {

  constructor(private teamService: TeamOfAreaBossService, private areaService: AreaService, private personalService: TechPersonalService, public dialog: MatDialog) { }

  teams: TeamOfAreaBoss [] = [];

  isDataChanged: boolean = false;

  //  Area values
  areaList: Area [] = [];

  //  TechnicalPersonal values
  technicalPersonalList: TechnicalPersonal [] = [];

  ngOnInit(): void {
    this.loadAllTeams();
  }

  // -------------------------------------
  // TeamOfAreaBoss methods
  // -------------------------------------

  loadAllTeams() {
    this.teamService.loadAllTeams()
      .subscribe((data: []) => {
        this.teams = data;
        console.log(this.teams);
      })
  }

  createTeam() {
    let teamEdit: TeamOfAreaBossEdit = new TeamOfAreaBossEdit();
    console.log('Create Team')
    this.teamService.createNewTeam(teamEdit)
      .subscribe(
        (data: TeamOfAreaBoss) => {
          this.teams.push(data);
        },
        error => console.log(error)
      );
  }

  saveTeam(team: TeamOfAreaBoss) {
    if (this.isDataChanged) {
      console.log('Save Area id: ' + team.teamId);
      let teamEdit: TeamOfAreaBossEdit = new TeamOfAreaBossEdit();
      teamEdit.update(team);

      this.teamService.saveTeam(teamEdit)
        .subscribe(
          (data: TeamOfAreaBoss) => {
            let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
            TeamOfAreaBoss.updateTeam(currentTeam, data);
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  deleteTeam(team: TeamOfAreaBoss) {
    this.teamService.deleteTeam(team.teamId)
      .subscribe(
        (data) => {
          this.teams = this.teams.filter(value => value.teamId !== team.teamId);
          console.log('Team id: ' + team.teamId + ' is deleted');
          this.isDataChanged = false;
        },
        error => console.log(error)
      );
  }

  cancelTeam(team: TeamOfAreaBoss) {
    console.log('Cancel Team id: ' + team.teamId);
    if (this.isDataChanged)
      this.onAfterCollapse(team);
  }

  onAfterCollapse(team: TeamOfAreaBoss) {
    console.log('OnAfterCollapse event, Team id: ' + team.teamId);
    if (this.isDataChanged) {
      console.log('The Team Data changed, clear changes for Team id: ' + team.teamId);
      this.teamService.loadTeamById(team.teamId)
        .subscribe(
          (data: TeamOfAreaBoss) => {
            let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
            TeamOfAreaBoss.updateTeam(currentTeam, data);
            this.isDataChanged = false;
          },
          error => console.log(error)
        );
    }
  }

  // -------------------------------------
  // Area methods
  // -------------------------------------

  addAreaEvent(team: TeamOfAreaBoss) {
    console.log('AddAreaEvent enter');
    this.areaService.loadAllAreas()
      .subscribe(
        (data: []) => {
          this.areaList = data;
          let selectData: SelectData [] = [];
          this.areaList.forEach(value => {
            let viewValue: string = 'Area id: ' + value.areaId;
            let disableValue: boolean = false;
            if (value.teamOfAreaBoss !== undefined) {
              disableValue = true;
              viewValue = viewValue + '  [ Team id: ' + value.teamOfAreaBoss.teamId + ' ]';
            }
            selectData.push(new SelectDataImpl(value.areaId, viewValue, disableValue));
          });
          this.openAreaDialog(team, selectData);
        },
        error => console.log(error)
      );
  }

  openAreaDialog(team: TeamOfAreaBoss, data: SelectData[]): void {
    console.log('Open Dialog for Team id: ' + team.teamId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '350px',
      data: { "selectedDataList": data, "isMultiple": false, "title": "Area" }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let areaId: number = result[0];
        let area: Area = this.areaList.find(value => value.areaId === areaId);
        let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
        currentTeam.area = area;
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isDataChanged = true;
      });
  }

  deleteAreaEvent(team: TeamOfAreaBoss) {
    console.log('DeleteAreaEvent, Team id: ' + team.teamId);
    let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
    currentTeam.area = undefined;
    // Update this.isAreaDataChanged value
    this.isDataChanged = true;
  }

  // -------------------------------------
  // TechnicalPersonal methods
  // -------------------------------------

  addPersonalEvent(team: TeamOfAreaBoss) {
    console.log('AddPersonalEvent enter');
    this.personalService.loadAllTechnicalPersonals()
      .subscribe(
        (data: TechnicalPersonal[]) => {
          this.technicalPersonalList = data;
          let selectData: SelectData [] = [];
          this.technicalPersonalList.forEach(value => {
            let viewValue: string = 'Id: ' + value.techPersonalId
              + ', ' + value.personalName + ' - ' + value.personalType;
            let disableValue: boolean = false;

            // Check whether current object already contains this item
            if (team.technicalPersonals !== undefined
              && team.technicalPersonals.find(item => item.techPersonalId === value.techPersonalId) !== undefined) {
              disableValue = true;
            }

            if (value.teamOfAreaBoss !== undefined)
              disableValue = true;

            selectData.push(new SelectDataImpl(value.techPersonalId, viewValue, disableValue));
          });
          this.openPersonalDialog(team, selectData);
        },
        error => console.log(error)
      );
  }

  openPersonalDialog(team: TeamOfAreaBoss, data: SelectData[]): void {
    console.log('Open Dialog for Team id: ' + team.teamId);
    const dialogRef = this.dialog.open(SelectDialogSingleComponent, {
      width: '550px',
      data: { "selectedDataList": data, "isMultiple": true, "title": "Personals" }
    });

    dialogRef.afterClosed()
      .subscribe((result: number []) => {
        console.log('The dialog was closed, selected value: ' + result);
        if (result === undefined || result.length === 0)
          return;
        let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
        result.forEach(personalId => {
          let technicalPersonal: TechnicalPersonal = this.technicalPersonalList.find(value => value.techPersonalId === personalId);
          if (currentTeam.technicalPersonals === undefined)
            currentTeam.technicalPersonals = [];
          currentTeam.technicalPersonals.push(technicalPersonal);
        });
        this.dialog.ngOnDestroy();
        // Update this.isAreaDataChanged value
        this.isDataChanged = true;
      });
  }

  deletePersonalEvent(team: TeamOfAreaBoss, personal: TechnicalPersonal) {
    console.log('DeleteAreaEvent, Team id: ' + team.teamId + ', personal id: ' + personal.techPersonalId);
    let currentTeam: TeamOfAreaBoss = this.teams.find(value => value.teamId === team.teamId);
    if (currentTeam.technicalPersonals === undefined || currentTeam.technicalPersonals.length === 0)
      return;
    currentTeam.technicalPersonals = currentTeam.technicalPersonals.filter(value => value.techPersonalId !== personal.techPersonalId);
    // Update this.isAreaDataChanged value
    this.isDataChanged = true;
  }

}
