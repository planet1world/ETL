import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ConnectionmanagerRoutingModule } from './connectionmanager-routing.module';
import { ConnectionmanagerComponent } from './connectionmanager.component';
import { PageHeaderModule, ModalModule, SharedPipesModule, PageModalModule } from './../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConnectionmanagerRoutingModule,
    PageHeaderModule, 
    SharedPipesModule,
    ModalModule,
    PageModalModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot(
      {
        provide: TranslateLoader,
        useFactory: TranslateFactory,
        deps: [Http]
      }
    ),
    // NgbModule.forRoot(),


  ],
  declarations: [ConnectionmanagerComponent]
})
export class ConnectionmanagerModule { }
export function TranslateFactory(http: Http) { 
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

