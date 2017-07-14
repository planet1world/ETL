import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertyManagerComponent } from './property-manager.component';

const routes: Routes = [
    { path: '', component: PropertyManagerComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyManagerRoutingModule { }