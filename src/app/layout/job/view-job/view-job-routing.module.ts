import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewJobComponent } from './view-job.component';

const routes: Routes = [
    { path: '', component: ViewJobComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewJobComponentModule { }