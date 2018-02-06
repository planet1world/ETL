import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Job, ExtractControl } from '../../../modal/job.modal';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.css']
})
export class ViewJobComponent implements OnInit {

  jobList : Job[];
  job : Job = new Job();
  jobId : number;
  propertyId : number;
  pgId : number;
  productId : number;
  extractControls : ExtractControl[];
  loadcontrol = true;
  jobSummary = false;
  scheduledInfo : string;
  exectionInfo : string;


  constructor ( public ServiceURL: ERService, public router: Router, private data: Data)  {
    this.jobId = this.data.EditJobId;
    this.productId = this.data.EditJobProductId;
    this.propertyId = this.data.EditJobPropertyId;
    this.pgId = this.data.EditJobPgId;
    this. getJobDetails(this.propertyId, this.productId );
    this.getListOfExtractControls(this.jobId, this.productId)
    this.getJobScheduleDetails(this.jobId);
    this.getJobExecutionStatus(this.jobId);
   }

  ngOnInit() {
  }

  getJobDetails(propertyid : number, productid : number){
    this.ServiceURL.GetAllJobsForProduct(propertyid, productid)
      .subscribe(
      (data: Job[]) => {
        console.log("view jobs: =  " + JSON.stringify( data));
        this.jobList = data.filter(jobid=> jobid.JobID = this.jobId );
        this.filterJob(this.jobList);
        this.jobSummary = true;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
    
      });
  }

  filterJob(jobList : Job[])
  {
    if(jobList.length > 0)
    {
        this.job = jobList[0];
    }
  }

  getListOfExtractControls(jobid : number, productid : number){
    this.loadcontrol = true;    
    this.ServiceURL.GetListOfExtractControls(jobid, productid)
      .subscribe(
      (data: ExtractControl[]) => {
        this.extractControls = data;
        console.log("extractControls: =  " + JSON.stringify( data));
        this.loadcontrol = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.loadcontrol = false;
        
      });
  }
  
  getJobScheduleDetails(jobId : number)
  {
    this.ServiceURL.GetJobScheduleDetails(jobId)
    .subscribe((data) => {
     this.scheduledInfo=data.message;
    },
    (error) => {
      const errorData = error.json();
      console.log('error:', errorData);
      this.scheduledInfo= errorData.Message;
    });
  }
  
  getJobExecutionStatus(jobId : number)
  {
    this.ServiceURL.GetJobExecutionStatus(jobId)
    .subscribe((data) => {
     this.exectionInfo=data;
    },
    (error) => {
      const errorData = error.json();
      console.log('error:', errorData);
      this.exectionInfo= errorData.Message;
    });
  }


  onClose()
  {
    this.router.navigate(['../list-job']);
  }


}
