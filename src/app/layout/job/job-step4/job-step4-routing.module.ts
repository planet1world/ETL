import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobStep4Component } from './job-step4.component';

const routes: Routes = [
    { path: '', component: JobStep4Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobStep4ComponentModule { }