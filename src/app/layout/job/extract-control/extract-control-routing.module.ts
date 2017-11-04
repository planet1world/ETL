import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtractControlComponent } from './extract-control.component';

const routes: Routes = [
    { path: '', component: ExtractControlComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtractControlComponentModule { }