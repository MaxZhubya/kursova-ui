import {Area} from './area';
import {WorkerMy} from './worker-my';

export class Brigade {

  public brigadeId: number;
  public workers: Array<WorkerMy>;
  public area: Area;
  public created: Date;
  public modified: Date;

  constructor() {
    this.brigadeId = null;
    this.workers = [];
    this.area = null;
  }

  public static update(currentBrigade: Brigade, brigade: Brigade) {

    currentBrigade.workers = brigade.workers;
    if (currentBrigade.workers !== undefined && currentBrigade.workers !== null)
      currentBrigade.workers.sort((b, a) => b.workerId - a.workerId);

    currentBrigade.area = brigade.area;
    currentBrigade.modified = brigade.modified;
  }
}
