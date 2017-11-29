import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobHistoryDetailComponent } from './job-history-detail.component';

const routes: Routes = [
    { path: '', component: JobHistoryDetailComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobHistoryDetailComponentModule { }