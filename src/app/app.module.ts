import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';
import { TranslateModule,TranslatePipe,TranslateLoader,TranslateStaticLoader  } from 'ng2-translate';
import { ERService } from './shared/services/er-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './services/auth/auth/auth.component';
import { AuthService } from './shared/services/auth.service';
import {servicelist} from './services/servicelist';
import { EqualValidatorDirective } from './equal-validator.directive'
import {Alertlist} from './services/alertlistservice';
import { CookieService } from 'ng2-cookies';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './shared/modules/spinner/spinner.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Data} from './shared/data/data';
import {OndemandJobData} from './shared/data/ondemand-job-data';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

// import { ModalComponent }from './layout/modal/modal.component'

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        EqualValidatorDirective,
        SpinnerComponent,     
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        BrowserAnimationsModule,
       TranslateModule.forRoot(
           { 
          provide: TranslateLoader,
          useFactory:TranslateFactory ,
          deps: [Http]
        }
       )
    ],
    providers: [AuthService,servicelist,Alertlist,CookieService,ERService,Data,OndemandJobData,{provide: LocationStrategy, useClass: HashLocationStrategy} ],
    bootstrap: [AppComponent]
})
export class AppModule { }
export function TranslateFactory(http: Http) {
  return  new TranslateStaticLoader(http, './assets/i18n', '.json');
} 
