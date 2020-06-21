import {TeamOfAreaBoss} from './teamOfAreaBoss';

export enum TechPersonalType {
  ENGINEER, TECHNOLOG, TECHNIC, TEAM_OF_AREA_BOSS, WORKSHOP_BOSS, MASTER
}

export class TechnicalPersonal {

  public techPersonalId: number;
  public teamOfAreaBoss: TeamOfAreaBoss;
  public personalName: string;
  public personalType: TechPersonalType;
  public description: string;
  public created: Date;
  public modified: Date;

  constructor() {
    this.techPersonalId = null;
    this.teamOfAreaBoss = null;
    this.personalName = '';
    this.personalType = null;
    this.description = '';
  }

  public static update(currentPersonal: TechnicalPersonal, personal: TechnicalPersonal) {
    currentPersonal.teamOfAreaBoss = personal.teamOfAreaBoss;
    currentPersonal.personalName = personal.personalName;
    currentPersonal.personalType = personal.personalType;
    currentPersonal.description = personal.description;
    currentPersonal.modified = personal.modified;
  }
}
