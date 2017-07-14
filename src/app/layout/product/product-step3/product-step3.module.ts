import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProductStep3RoutingModule } from './product-step3-routing.module';
import { ProductStep3Component } from './product-step3.component';
import { PageHeaderModule, ModalModule, SharedPipesModule } from '../../../shared';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalModule,
        SharedPipesModule,
        ProductStep3RoutingModule,
        PageHeaderModule,
        TranslateModule.forRoot(
            {
                provide: TranslateLoader,
                useFactory: TranslateFactory,
                deps: [Http]
            }
        ),
    ],
    declarations: [ProductStep3Component]
})
export class Productstep3Module { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
