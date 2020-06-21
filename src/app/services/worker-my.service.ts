import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WorkerMyEdit} from '../model/worker-my-edit';

const localUrl = 'http://localhost:8888/api/worker';
//const localUrl = '/api/worker';

@Injectable()
export class WorkerMyService {

  constructor(private http: HttpClient) {
  }

  public loadAllWorkers() {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list', { headers: headers, responseType: 'json' });
  }

  public loadWorkerById(id: number) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.get(localUrl + '/list/' + id, { headers: headers, responseType: 'json' });
  }

  public createNewWorker(worker: WorkerMyEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(localUrl + '/add', worker, { headers: headers, responseType: 'json' });
  }

  public saveWorker(worker: WorkerMyEdit) {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.put(localUrl + '/edit', worker, { headers: headers, responseType: 'json' });
  }

  public deleteWorker(id: number) {
    return this.http.delete(localUrl + '/delete/' + id);
  }

}
