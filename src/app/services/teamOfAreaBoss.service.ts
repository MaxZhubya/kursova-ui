import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TeamOfAreaBossEdit} from '../model/teamOfAreaBoss-edit';

const localUrl = 'http://localhost:8888/api/teamOfAreaBoss';
//const localUrl = '/api/teamOfAreaBoss';

@Injectable()
export class TeamOfAreaBossService {

  constructor(private http: HttpClient) {
  }

  public loadAllTeams() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadTeamById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewTeam(team: TeamOfAreaBossEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', team, { headers: headers, responseType: 'json' });
  }

  public saveTeam(team: TeamOfAreaBossEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', team, { headers: headers, responseType: 'json' });
  }

  public deleteTeam(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
