import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RunningJobsComponentModule } from './running-jobs-routing.module';
import { RunningJobsComponent } from './running-jobs.component';
import { PageHeaderModule, ModalModule,SharedPipesModule } from './../../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RunningJobsComponentModule,
    PageHeaderModule,
    ModalModule,
    SharedPipesModule,
    ReactiveFormsModule,
    TranslateModule.forRoot(
      {
        provide: TranslateLoader,
        useFactory: TranslateFactory,
        deps: [Http]
      }
    ),
    NgbModule.forRoot(),


  ],
  declarations: [RunningJobsComponent]
})
export class RunningJobsModule { }
export function TranslateFactory(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

