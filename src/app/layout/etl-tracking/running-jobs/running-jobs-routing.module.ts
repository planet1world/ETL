import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunningJobsComponent } from './running-jobs.component';

const routes: Routes = [
    { path: '', component: RunningJobsComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RunningJobsComponentModule { }