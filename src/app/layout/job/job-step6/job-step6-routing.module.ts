import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ JobStep6Component} from './job-step6.component';

const routes: Routes = [
  {path: '', component: JobStep6Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobStep6RoutingModule { }
