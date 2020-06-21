import {Brigade} from './brigade';
import {TeamOfAreaBoss} from './teamOfAreaBoss';
import {Product} from './product';
import {Workshop} from './workshop';

export class Area {

  public areaId: number;
  public teamOfAreaBoss: TeamOfAreaBoss;
  public brigades: Array<Brigade>;
  public products: Array<Product>;
  public workshop: Workshop;
  public definition: string;
  public created: Date;
  public modified: Date;

  constructor() {
    this.areaId = null;
    this.teamOfAreaBoss = null;
    this.brigades = new Array<Brigade>();
    this.products = new Array<Product>();
    this.workshop = null;
    this.definition = '';
  }

  public static updateArea(currentArea: Area, area: Area) {
    currentArea.teamOfAreaBoss = area.teamOfAreaBoss;

    currentArea.brigades = area.brigades;
    if (currentArea.brigades !== undefined && currentArea.brigades !== null)
      currentArea.brigades.sort((b, a) => b.brigadeId - a.brigadeId);

    currentArea.products = area.products;
    if (currentArea.products !== undefined && currentArea.products !== null)
      currentArea.products.sort((b, a) => b.productId - a.productId);

    currentArea.workshop = area.workshop;
    currentArea.modified = area.modified;
  }

}
