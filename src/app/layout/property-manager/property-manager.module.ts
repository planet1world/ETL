import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { PropertyManagerRoutingModule } from './property-manager-routing.module';
import { PropertyManagerComponent } from './property-manager.component';
import { PageHeaderModule, ModalModule, SharedPipesModule, PageModalModule } from './../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Accordion, AccordionGroup } from '../../accordion';
// import {Accordion,AccordionGroup,AccordionToggle,AccordionHeading} from "./../../shared";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PropertyManagerRoutingModule,
    PageHeaderModule,
    SharedPipesModule,
    ModalModule,
    PageModalModule,
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
  declarations: [PropertyManagerComponent, Accordion, AccordionGroup]
})
export class PropertyManagerModule { }
export function TranslateFactory(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

