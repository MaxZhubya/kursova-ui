import {TeamOfAreaBoss} from './teamOfAreaBoss';

export class TeamOfAreaBossEdit {
  public teamId: number;
  public areaId: number;
  public technicalPersonalIds: number [] = [];

  constructor() {
    this.teamId = null;
    this.areaId = null;
    this.technicalPersonalIds = [];
  }

  public update(team: TeamOfAreaBoss) {
    this.teamId = team.teamId;

    if (team.technicalPersonals)
      team.technicalPersonals.forEach(value => this.technicalPersonalIds.push(value.techPersonalId));

    if (team.area)
      this.areaId = team.area.areaId;
  }
}
