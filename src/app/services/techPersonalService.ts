import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TechnicalPersonalEdit} from '../model/technicalPersonal-edit';

const localUrl = 'http://localhost:8888/api/technicalPersonal';

@Injectable()
export class TechPersonalService {

  constructor(private http: HttpClient) {
  }

  public loadAllTechnicalPersonals() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadTechnicalPersonalById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewTechnicalPersonal(technicalPersonal: TechnicalPersonalEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', technicalPersonal, { headers: headers, responseType: 'json' });
  }

  public saveTechnicalPersonal(technicalPersonal: TechnicalPersonalEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', technicalPersonal, { headers: headers, responseType: 'json' });
  }

  public deleteTechnicalPersonal(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
