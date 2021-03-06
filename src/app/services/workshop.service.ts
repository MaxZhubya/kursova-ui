import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WorkshopEdit} from '../model/workshop-edit';
import {API_URL} from '../app.component';

const localUrl = API_URL + '/workshop';

@Injectable()
export class WorkshopService {

  constructor(private http: HttpClient) {
  }

  public loadAllWorkshops() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadWorkshopById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewWorkshop(workshop: WorkshopEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', workshop, { headers: headers, responseType: 'json' });
  }

  public saveWorkshop(workshop: WorkshopEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', workshop, { headers: headers, responseType: 'json' });
  }

  public deleteWorkshop(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }
}
