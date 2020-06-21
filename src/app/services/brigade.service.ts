import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BrigadeEdit} from '../model/brigade-edit';
import {API_URL} from '../app.component';

const localUrl = API_URL + '/brigade';

@Injectable()
export class BrigadeService {

  constructor(private http: HttpClient) {
  }

  public loadAllBrigades() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadBrigadeById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewBrigade(brigade: BrigadeEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', brigade, { headers: headers, responseType: 'json' });
  }

  public saveBrigade(brigade: BrigadeEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', brigade, { headers: headers, responseType: 'json' });
  }

  public deleteBrigade(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
