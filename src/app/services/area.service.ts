import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AreaEdit} from '../model/area-edit';

const localUrl = 'http://localhost:8888/api/area';

@Injectable()
export class AreaService {

  constructor(private http: HttpClient) {
  }

  public loadAllAreas() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadAreaById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewArea(area: AreaEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', area, { headers: headers, responseType: 'json' });
  }

  public saveArea(area: AreaEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', area, { headers: headers, responseType: 'json' });
  }

  public deleteArea(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
