import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulingOndemandComponent } from './scheduling-ondemand.component';

const routes: Routes = [
    { path: '', component: SchedulingOndemandComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulingOndemandComponentModule { }