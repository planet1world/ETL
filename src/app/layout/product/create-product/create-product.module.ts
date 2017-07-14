import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CreateProductRoutingModule } from './create-product-routing.module';
import { CreateProductComponent } from './create-product.component';
import { PageHeaderModule, ModalModule, SharedPipesModule } from '../../../shared';
import { HttpModule, Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CreateProductRoutingModule,
        PageHeaderModule,
        SharedPipesModule,
        ModalModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(
            {
                provide: TranslateLoader,
                useFactory: TranslateFactory,
                deps: [Http]
            }
        ),
    ],
    declarations: [CreateProductComponent]
})
export class CreateProductModule { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

