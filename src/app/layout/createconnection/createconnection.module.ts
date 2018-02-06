import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateconnectionRoutingModule } from './createconnection-routing.module';
import { CreateconnectionComponent } from './createconnection.component';
import { PageHeaderModule, ModalModule } from './../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CreateconnectionRoutingModule,
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
  declarations: [CreateconnectionComponent]
})
export class CreateconnectionrModule { }
export function TranslateFactory(http: Http) {
  // console.log(new TranslateStaticLoader(http, 'ER/assets/i18n', '.json'));
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

