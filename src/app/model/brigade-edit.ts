import {Area} from './area';
import {Brigade} from './brigade';

export class BrigadeEdit {
  public brigadeId: number;
  public areaId: number;
  public workerIds: number [];


  constructor() {
    this.brigadeId = null;
    this.areaId = null;
    this.workerIds = [];
  }

  public update(brigade: Brigade) {
    this.brigadeId = brigade.brigadeId;

    if (brigade.area)
      this.areaId = brigade.area.areaId;

    if (brigade.workers)
      brigade.workers.forEach(value => this.workerIds.push(value.workerId));

  }
}
