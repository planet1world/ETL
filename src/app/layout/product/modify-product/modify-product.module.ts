import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ModifyProductRoutingModule } from './modify-product-routing.module';
import { ModifyProductComponent } from './modify-product.component';
import { PageHeaderModule,ModalModule} from '../../../shared';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslatePipe, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModifyProductRoutingModule,
        PageHeaderModule,
        ModalModule,
        TranslateModule.forRoot(
            {
                provide: TranslateLoader,
                useFactory: TranslateFactory,
                deps: [Http]
            }
        ),
    ],
    declarations: [ModifyProductComponent]
})
export class ModifyProductModule { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
