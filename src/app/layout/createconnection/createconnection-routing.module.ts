import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateconnectionComponent } from './createconnection.component';

const routes: Routes = [
    { path: '', component: CreateconnectionComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateconnectionRoutingModule { }