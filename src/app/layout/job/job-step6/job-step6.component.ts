import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERService } from '../../../shared/services/er-service.service';
import { JobSummaryTables } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-job-step6',
  templateUrl: './job-step6.component.html',
  styleUrls: ['./job-step6.component.css']
})
export class JobStep6Component implements OnInit {
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
    onBackJob5()
    {
      this.router.navigate(['../job-step5']);
    }
    onNextSchedule()
    {
      this.router.navigate(['../schedulling']);
    }
}
