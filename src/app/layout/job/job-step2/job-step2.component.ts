import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { Job, JobTables } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-job-step2',
  templateUrl: './job-step2.component.html',
  styleUrls: ['./job-step2.component.css']
})
export class JobStep2Component implements OnInit {
  tablelist: JobTables[];
  filterSource = '';
  flagSave: boolean;
  tableCount: number;
  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.fetchTablesforJob(this.data.selectedJob.ProductId, this.data.selectedJob.JobID);
  }

  ngOnInit() {
  }
  fetchTablesforJob(productid: number, jobid: number) {
    this.ServiceURL.GetTableForJob(jobid, productid)
      .subscribe(
      (data: JobTables[]) => {
        this.tablelist = data;
        this.tableCount = this.tablelist.length;
        console.log(this.tablelist);
      },
      (error) => {
        console.log(error.json());
      }
      );
  }
  checkAll(ev) {
    this.tablelist.forEach(x => { if (!x.Disable) x.Selected = ev.target.checked })
  }

  onBack() {
    this.router.navigate(['../jobcreation']);
  }
  onNext3Step() {
    this.flagSave = true;
    this.ServiceURL.ExtractionControl(this.tablelist)
      .subscribe(
      (data: any) => {
        console.log(data);
        this.flagSave = false;
        this.router.navigate(['../job-step3']);
      },
      (error) => {
        this.flagSave = false;
        console.log(error.json());
      }
      );

  }
}
