import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {JobStep6Component } from './job-step6.component';

import { JobStep6RoutingModule } from './job-step6-routing.module';

@NgModule({
  imports: [
    CommonModule,
    JobStep6RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [JobStep6Component]
})
export class JobStep6Module { }
