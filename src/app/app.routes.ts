import { Routes } from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContentComponent} from './content/content.component';
import {AreaViewComponent} from './area-view/area-view.component';
import {BrigadeViewComponent} from './brigade-view/brigade-view.component';
import {EquipmentViewComponent} from './equipment-view/equipment-view.component';
import {LaboratoryViewComponent} from './laboratory-view/laboratory-view.component';
import {ProductViewComponent} from './product-view/product-view.component';
import {TeamOfAreaBossViewComponent} from './team-of-area-boss-view/team-of-area-boss-view.component';
import {TechnicalPersonalViewComponent} from './technical-personal-view/technical-personal-view.component';
import {WorkerMyViewComponent} from './worker-my-view/worker-my-view.component';
import {WorkshopViewComponent} from './workshop-view/workshop-view.component';

export const appRoutes: Routes =[
  {path: 'sidebar', component: SidebarComponent},
  {path: 'content', component: ContentComponent},
  {path: 'areaView', component: AreaViewComponent},
  {path: 'brigadeView', component: BrigadeViewComponent},
  {path: 'equipmentView', component: EquipmentViewComponent},
  {path: 'laboratoryView', component: LaboratoryViewComponent},
  {path: 'productView', component: ProductViewComponent},
  {path: 'teamOfAreaBossView', component: TeamOfAreaBossViewComponent},
  {path: 'technicalPersonalView', component: TechnicalPersonalViewComponent},
  {path: 'workerView', component: WorkerMyViewComponent},
  {path: 'workshopView', component: WorkshopViewComponent}
];
