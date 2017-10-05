import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { SchedullingRoutingModule } from './schedulling-routing.module';
import { SchedullingComponent} from './schedulling.component';
import { PageHeaderModule, ModalModule,SharedPipesModule } from './../../../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';import { HttpModule, Http } from '@angular/http';

import { FrequencyComponent,OnetimeComponent } from './component';
import { DailyfrequencyComponent } from './component/dailyfrequency/dailyfrequency.component';
import { DurationComponent } from './component/duration/duration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SchedullingRoutingModule,
    ReactiveFormsModule, 
    HttpModule,  
    PageHeaderModule,
    ModalModule,
    SharedPipesModule,
    TranslateModule.forRoot(
      {
        provide: TranslateLoader,
        useFactory: TranslateFactory,
        deps: [Http]
      }
    ),
    NgbModule.forRoot(),   

  ],
  declarations: [SchedullingComponent, OnetimeComponent, FrequencyComponent, DailyfrequencyComponent, DurationComponent]
})
export class SchedullingModule { }
export function TranslateFactory(http: Http) {
  // console.log(new TranslateStaticLoader(http, 'ER/assets/i18n', '.json'));
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
