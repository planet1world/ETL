import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OndemandJobComponent } from './ondemand-job.component';

const routes: Routes = [
    { path: '', component: OndemandJobComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OndemandJobComponentModule { }