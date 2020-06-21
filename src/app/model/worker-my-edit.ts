import {WorkerMyType} from './worker-my';

export class WorkerMyEdit {

  public workerId: number;
  public name: string;
  public type: string;
  public brigadeId: number;

  constructor() {
    this.workerId = null;
    this.name = '';
    this.type = '';
    this.brigadeId = null;
  }
}
