import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TreeModule } from 'angular2-tree-component';
import { TreeViewRoutingModule } from './tree-view-routing.module';
import { TreeViewComponent } from './tree-view.component';
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
        TreeViewRoutingModule,
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
    declarations: [TreeViewComponent]
})
export class TreeViewModule { }
export function TranslateFactory(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
