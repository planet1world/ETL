import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobcreationComponent } from './jobcreation.component';

const routes: Routes = [
    { path: '', component: JobcreationComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobcreationComponentModule { }