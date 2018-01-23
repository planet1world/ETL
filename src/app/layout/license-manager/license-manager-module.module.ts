import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LicenseManagerRoutingModule } from './license-manager-routing.module';
import { LicenseManagerComponent } from './license-manager.component';
import { PageHeaderModule, ModalModule, SharedPipesModule, PageModalModule } from './../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { AccordionModule } from '../../accordion.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LicenseManagerRoutingModule,
    PageHeaderModule,
    SharedPipesModule,
    ModalModule,
    PageModalModule,
    AccordionModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    TranslateModule.forRoot(
      {
        provide: TranslateLoader,
        useFactory: TranslateFactory,
        deps: [Http]
      }
    ),

  ],
  declarations: [LicenseManagerComponent]
})
export class LicenseManagerModule { }
export function TranslateFactory(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

