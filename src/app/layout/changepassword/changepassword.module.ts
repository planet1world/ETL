import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChangepasswordRoutingModule } from './changepassword-routing.module';
import { ChangepasswordComponent } from './changepassword.component';
import { PageHeaderModule } from './../../shared';
import { HttpModule, Http } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule,TranslatePipe,TranslateLoader,TranslateStaticLoader  } from 'ng2-translate';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChangepasswordRoutingModule,
    PageHeaderModule,     
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
  declarations: [ChangepasswordComponent]
})
export class ChangepasswordModule { }
export function TranslateFactory(http: Http) {
  // console.log(new TranslateStaticLoader(http, 'ER/assets/i18n', '.json'));
  return  new TranslateStaticLoader(http, './assets/i18n', '.json');
} 

