import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERService } from '../../../shared/services/er-service.service';
import { JobSummaryTables } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-jobedit-step2',
  templateUrl: './jobedit-step2.component.html',
  styleUrls: ['./jobedit-step2.component.css']
})
export class JobeditStep2Component implements OnInit {
  sumarryData: JobSummaryTables[];
  
    constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
  
      this.fetchSummaryData(this.data.EditJobId, this.data.EditJobProductId);
  
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
    onBackJobEdit1()
    {
      this.router.navigate(['../jobedit-step1']);
    }
    onNextSchedule()
    {
      this.router.navigate(['../schedulling']);
    }
}
