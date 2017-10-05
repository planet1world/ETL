import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SchedullingComponent} from './schedulling.component'

const routes: Routes = [{path:'',component:SchedullingComponent}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedullingRoutingModule { }
