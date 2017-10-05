import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent, FooterComponent } from '../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        NgbModule.forRoot(),
        TranslateModule.forRoot(
            {
                provide: TranslateLoader,
                useFactory: TranslateFactory,
                deps: [Http]
            }
        )
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        FooterComponent,
        
        
        
    ]
})
export class LayoutModule { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
} 
