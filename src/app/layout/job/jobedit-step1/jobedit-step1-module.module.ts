import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { JobeditStep1ComponentModule } from './jobedit-step1-routing.module';
import { JobeditStep1Component } from './jobedit-step1.component';
import { PageHeaderModule, ModalModule } from './../../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    JobeditStep1ComponentModule,
    PageHeaderModule,
    ModalModule,
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
  declarations: [JobeditStep1Component]
})
export class JobeditStep1Module { }
export function TranslateFactory(http: Http) {
  // console.log(new TranslateStaticLoader(http, 'ER/assets/i18n', '.json'));
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

