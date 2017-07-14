import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductStep3Component } from './product-step3.component';

const routes: Routes = [
    { path: '', component: ProductStep3Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductStep3RoutingModule { }
