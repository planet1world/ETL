import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TreeModule } from 'angular2-tree-component';
import { ViewProductRoutingModule } from './view-product-routing.module';
import { ViewProductComponent } from './view-product.component';
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
        ViewProductRoutingModule,
        PageHeaderModule,
        TreeModule,
        TranslateModule.forRoot(
            {
                provide: TranslateLoader,
                useFactory: TranslateFactory,
                deps: [Http]
            }
        ),
    ],
    declarations: [ViewProductComponent]
})
export class ViewProductModule { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
