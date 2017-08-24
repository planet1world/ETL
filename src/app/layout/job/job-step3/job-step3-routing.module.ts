import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobStep3Component } from './job-step3.component';

const routes: Routes = [
    { path: '', component: JobStep3Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobStep3ComponentModule { }