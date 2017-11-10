import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobeditStep1Component } from './jobedit-step1.component';

const routes: Routes = [
    { path: '', component: JobeditStep1Component ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobeditStep1ComponentModule { }