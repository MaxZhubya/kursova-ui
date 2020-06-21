import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LaboratoryEdit} from '../model/laboratory-edit';

const localUrl = 'http://localhost:8888/api/laboratory';
//const localUrl = '/api/laboratory';

@Injectable()
export class LaboratoryService {

  constructor(private http: HttpClient) {
  }

  public loadAllLaboratories() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadLaboratoryById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewLaboratory(laboratory: LaboratoryEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', laboratory, { headers: headers, responseType: 'json' });
  }

  public saveLaboratory(laboratory: LaboratoryEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', laboratory, { headers: headers, responseType: 'json' });
  }

  public deleteLaboratory(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
