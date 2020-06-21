import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {EquipmentEdit} from '../model/equipment-edit';
import {API_URL} from '../app.component';

const localUrl = API_URL + '/equipment';

@Injectable()
export class EquipmentService {

  constructor(private http: HttpClient) {
  }

  public loadAllEquipments() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public createNewEquipment(equipment: EquipmentEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', equipment, { headers: headers, responseType: 'json' });
  }

  public loadEquipmentById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public saveEquipment(equipment: EquipmentEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', equipment, { headers: headers, responseType: 'json' });
  }

  public deleteEquipment(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }
}
