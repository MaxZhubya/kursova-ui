import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Routes, RouterModule} from '@angular/router';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import {appRoutes} from './app.routes';
import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {AreaService} from './services/area.service';
import { AreaViewComponent } from './area-view/area-view.component';
import { BrigadeViewComponent } from './brigade-view/brigade-view.component';
import {BrigadeService} from './services/brigade.service';
import {EquipmentService} from './services/equipment.service';
import { EquipmentViewComponent } from './equipment-view/equipment-view.component';
import {LaboratoryService} from './services/laboratory.service';
import { LaboratoryViewComponent } from './laboratory-view/laboratory-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import {ProductService} from './services/product.service';
import { TeamOfAreaBossViewComponent } from './team-of-area-boss-view/team-of-area-boss-view.component';
import {TeamOfAreaBossService} from './services/teamOfAreaBoss.service';
import {TechPersonalService} from './services/techPersonalService';
import { TechnicalPersonalViewComponent } from './technical-personal-view/technical-personal-view.component';
import {WorkerMyService} from './services/worker-my.service';
import { WorkerMyViewComponent } from './worker-my-view/worker-my-view.component';
import {WorkshopService} from './services/workshop.service';
import { WorkshopViewComponent } from './workshop-view/workshop-view.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { SelectDialogSingleComponent } from './select-dialog-single/select-dialog-single.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidebarComponent,
    ContentComponent,
    AreaViewComponent,
    BrigadeViewComponent,
    EquipmentViewComponent,
    LaboratoryViewComponent,
    ProductViewComponent,
    TeamOfAreaBossViewComponent,
    TechnicalPersonalViewComponent,
    WorkerMyViewComponent,
    WorkshopViewComponent,
    SelectDialogSingleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSliderModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonToggleModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [
    AreaService,
    BrigadeService,
    EquipmentService,
    LaboratoryService,
    ProductService,
    TeamOfAreaBossService,
    TechPersonalService,
    WorkerMyService,
    WorkshopService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
