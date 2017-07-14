import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnectionmanagerComponent } from './connectionmanager.component';

const routes: Routes = [
    { path: '', component: ConnectionmanagerComponent ,
   
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionmanagerRoutingModule { }