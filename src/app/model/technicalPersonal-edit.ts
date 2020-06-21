import {TechnicalPersonal, TechPersonalType} from './technicalPersonal';

export class TechnicalPersonalEdit {
  public techPersonalId: number;
  public name: string;
  public type: string;
  public description: string;
  public teamOfAreaBossId: number;

  constructor() {
    this.techPersonalId = null;
    this.name = '';
    this.type = '';
    this.description = '';
    this.teamOfAreaBossId = null;
  }
}
