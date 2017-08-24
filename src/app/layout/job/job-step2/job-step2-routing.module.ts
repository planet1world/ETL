import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobStep2Component } from './job-step2.component';

const routes: Routes = [
    { path: '', component: JobStep2Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobStep2ComponentModule { }