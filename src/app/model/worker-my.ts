import {Brigade} from './brigade';

export enum WorkerMyType { SBORSCHIK, TOKAR, SVARSCHIK, SLUSAR, BRIGADIER};

export class WorkerMy {

  public workerId: number;
  public brigade: Brigade;
  public name: string;
  public type: WorkerMyType;
  public created: Date;
  public modified: Date;

  constructor() {
    this.workerId = null;
    this.brigade = null;
    this.name = '';
    this.type = null;
  }

  public static update(currentWorker: WorkerMy, worker: WorkerMy) {
    currentWorker.brigade = worker.brigade;
    currentWorker.name = worker.name;
    currentWorker.type = worker.type;
    currentWorker.modified = worker.modified;
  }
}
