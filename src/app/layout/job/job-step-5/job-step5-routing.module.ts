import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobStep5Component } from './job-step-5.component';

const routes: Routes = [
    { path: '', component: JobStep5Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobStep5ComponentModule { }