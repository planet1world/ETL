import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LicenseManagerComponent } from './license-manager.component';

const routes: Routes = [
    { path: '', component: LicenseManagerComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseManagerRoutingModule { }