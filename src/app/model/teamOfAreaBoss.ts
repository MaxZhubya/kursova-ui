import {Area} from './area';
import {TechnicalPersonal} from './technicalPersonal';

export class TeamOfAreaBoss {
  public teamId: number;
  public technicalPersonals: Array<TechnicalPersonal>;
  public area: Area;
  public created: Date;
  public modified: Date;

  constructor() {
    this.teamId = null;
    this.technicalPersonals = [];
    this.area = null;
  }

  public static updateTeam(currentTeam: TeamOfAreaBoss, team: TeamOfAreaBoss) {

    currentTeam.technicalPersonals = team.technicalPersonals;
    if (currentTeam.technicalPersonals !== undefined && currentTeam.technicalPersonals !== null)
      currentTeam.technicalPersonals.sort((b, a) => b.techPersonalId - a.techPersonalId);

    currentTeam.area = team.area;
    currentTeam.modified = team.modified;
  }
}
