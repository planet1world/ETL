import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductStep2Component } from './product-step2.component';

const routes: Routes = [
    { path: '', component: ProductStep2Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductStep2tRoutingModule { }
