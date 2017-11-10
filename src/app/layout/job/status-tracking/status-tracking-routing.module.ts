import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusTrackingComponent } from './status-tracking.component';

const routes: Routes = [
    { path: '', component: StatusTrackingComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusTrackingComponentModule { }