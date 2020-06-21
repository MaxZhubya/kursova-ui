import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const localUrl = 'http://localhost:8888/api/laboratory';

@Injectable()
export class LaboratoryService {

  constructor(private http: HttpClient) {
  }

  public loadAllLaboratories() {
    return this.http.get(localUrl + '/list');
  }

}
