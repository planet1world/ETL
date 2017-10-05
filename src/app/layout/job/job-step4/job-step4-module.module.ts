import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { JobStep4ComponentModule } from './job-step4-routing.module';
import { JobStep4Component } from './job-step4.component';
import { PageHeaderModule, ModalModule,SharedPipesModule } from './../../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JobStep4ComponentModule,
    // PageHeaderModule,
    // ModalModule,
    SharedPipesModule,
    ReactiveFormsModule,
    // TranslateModule.forRoot(
    //   {
    //     provide: TranslateLoader,
    //     useFactory: TranslateFactory,
    //     deps: [Http]
    //   }
    // ),
    // NgbModule.forRoot(),


  ],
  declarations: [JobStep4Component]
})
export class JobStep4Module { }
export function TranslateFactory(http: Http) {
  // console.log(new TranslateStaticLoader(http, 'ER/assets/i18n', '.json'));
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

