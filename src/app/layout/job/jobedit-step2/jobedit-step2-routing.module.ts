import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobeditStep2Component } from './jobedit-step2.component';

const routes: Routes = [
    { path: '', component: JobeditStep2Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobeditStep2ComponentModule { }