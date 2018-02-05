import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef,ViewChild } from '@angular/core';
// import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OnceTime, JobSchedule } from '../../../modal';
import { Data } from '../../../shared/data/data';
import { ERService } from '../../../shared/services/er-service.service';

@Component({
  selector: 'app-schedulling',
  templateUrl: './schedulling.component.html',
  styleUrls: ['./schedulling.component.css']
})
export class SchedullingComponent implements OnInit {
  schedulerName: any;
  defaultTime = { hour: 13, minute: 30 };
  selected: number;
  onetimeMessage = "";
  frequencyMessage = "";
  dailyFrequencyMessage = "";
  duration_Message = "";
  finalMessage = "";
  isEnable = false;
  success=false;
  error=false;
  popmessage="";
  flagNext=false;
  isEdit = false;
  displayTxtArea = false;
  oldSchedulerInfo:string;
  Job = new JobSchedule();
  @ViewChild('schedulerTypeDD') schedulerTypeDD ; 
  errEelectedSchedule = false;

  constructor(private cdr: ChangeDetectorRef, private data: Data, public ServiceURL: ERService,public router:Router) {
    this.Job.active_end_date = "9999-12-31";
    this.Job.active_end_time = 235959;
    this.Job.active_start_date = "9999-12-31"
    this.Job.active_start_time = 0;
    this.Job.Enable = 0;
    this.Job.Freq_Interval = 0;
    this.Job.freq_recurrence_factor = 0;
    this.Job.freq_relative_interval = 0;
    this.Job.freq_subday_interval = 0;
    this.Job.Freq_Subday_Type = 0;
    this.Job.Freq_Type = 1;
    this.Job.JobId = this.data.selectedJob.JobID;
    this.Job.JobName = this.data.selectedJob.JobName;
    this.schedulerName = this.data.selectedJob.JobName;
    
    if(this.data.EditJobId != null){
      this.getJobScheduleDetails();
      this.isEdit = true;
    }
    
  }

  ngOnInit() {
  }

  getJobScheduleDetails()
  {
    this.ServiceURL.GetJobScheduleDetails(this.Job.JobId)
    .subscribe((data) => {
     this.oldSchedulerInfo=data;
    },
    (error) => {
      const errorData = error.json();
      console.log('error:', errorData);
      this.oldSchedulerInfo= errorData.Message;
    });
  }

  onSchedulerTypeChange(value: number) {
    this.finalMessage = "";
    this.errEelectedSchedule = false;
    this.selected = value;
    this.cdr.detectChanges();
    if (value == 1) {
      this.frequencyMessage = "";
      this.dailyFrequencyMessage = "";
      this.duration_Message = "";
    }
    else {
      this.onetimeMessage = "";
    }
    
    this.displayTxtArea = true;
    if(value == 0)
    this.displayTxtArea = false;

  }
  saveOneScheduleData(value: JobSchedule) {
    console.log(value);
  }
  saveOneScheduleTime(value: JobSchedule) {
    console.log(value);
  }
  changeFrequency(value: JobSchedule) {
    console.log(value);
  }
  changeDailyFrequency(value: JobSchedule) {
    console.log(value);
  }
  changeDuration(value: JobSchedule) {
    console.log(value);
  }
  durationMessage(value: string) {
    console.log(value);
    this.duration_Message = value;
    this.finalMessage = this.frequencyMessage + " " + this.dailyFrequencyMessage + " " + this.duration_Message;
  }
  oneTimeScheduleMessage(value: string) {
    this.onetimeMessage = value;
    this.finalMessage = this.onetimeMessage;
  }
  FrequencyMessage(value: string) {
    this.frequencyMessage = value;
    this.finalMessage = this.frequencyMessage + " " + this.dailyFrequencyMessage + " " + this.duration_Message;
  }
  onSave() {
    let selectedSchedule = this.schedulerTypeDD.nativeElement.value
    if(selectedSchedule == 0)
    {
      this.errEelectedSchedule=true;
      return false;
    }

    if (this.isEnable) {
      this.Job.Enable = 1;
    }
    else {
      this.Job.Enable = 0;
    }
    this.flagNext=true;
    console.log('post-job:= ' + JSON.stringify(this.Job));
    this.ServiceURL.JobScheduling(this.Job)
      .subscribe((data) => {
       this.popmessage=data;
      if(this.data.EditJobId != null){
        this.getJobScheduleDetails();
        this.isEdit = true;
      }
      this.finalMessage = "";
       this.success=true;
       this.flagNext=false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.popmessage= errorData.Message;
        this.error=true;
        this.flagNext=false;
      });
  }
  onBack() {
    if(this.data.EditJobId == null){
      this.router.navigate(['../job-step6']);
    }else{
      this.router.navigate(['../jobedit-step2']);
    }
  }

  onClose(){
    this.router.navigate(['../list-job']);
  }

}
