import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
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
  Job = new JobSchedule();

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
    this.Job.Freq_Type = 0;
    this.Job.JobId = this.data.selectedJob.JobID;
    this.Job.JobName = this.data.selectedJob.JobName;

  }

  ngOnInit() {
    this.schedulerName = this.data.selectedJob.JobName;
  }

  onSchedulerTypeChange(value: number) {
    this.finalMessage = "";
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
    if (this.isEnable) {
      this.Job.Enable = 1;
    }
    else {
      this.Job.Enable = 0;
    }
    this.flagNext=true;
    this.ServiceURL.JobScheduling(this.Job)
      .subscribe((data) => {
       this.popmessage=data;
       this.success=true;

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
    this.router.navigate(['../job-step6']);
  }
}
