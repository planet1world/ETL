import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERService } from '../../../shared/services/er-service.service';
import { JobSummaryTables } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-job-step-5',
  templateUrl: './job-step-5.component.html',
  styleUrls: ['./job-step-5.component.css']
})
export class JobStep5Component implements OnInit {

  sumarryData: JobSummaryTables[];

  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {

    this.fetchSummaryData(this.data.selectedJob.JobID, this.data.selectedJob.ProductId);

  }

  ngOnInit() {
  }

  fetchSummaryData(jobId: number, productid: number) {
    this.ServiceURL.JobStep5SummaryData(productid, jobId)
      .subscribe(
      (data: JobSummaryTables[]) => {

        this.sumarryData = data;
        console.log(data);
      },
      (error) => {
        console.log(error.json());
      }
      );

  }

  onNext6Step()
  {
    console.log(this.sumarryData);
    this.ServiceURL.UpdateFilterForTableJob(this.sumarryData)
    .subscribe(
      (data)=>{
        this.router.navigate(['../job-step6']);
      }
    ,(error)=>{
      console.log(error.json());
    }
    );
  }
  onBackJob4()
  {
    this.router.navigate(['../job-step4']);
  }

}
