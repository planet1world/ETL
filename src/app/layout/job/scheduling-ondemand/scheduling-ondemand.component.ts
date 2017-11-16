import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OnceTime, JobSchedule } from '../../../modal';
import { OndemandJobData } from '../../../shared/data/ondemand-job-data';
import { ERService } from '../../../shared/services/er-service.service';


@Component({
  selector: 'app-scheduling-ondemand',
  templateUrl: './scheduling-ondemand.component.html',
  styleUrls: ['./scheduling-ondemand.component.css']
})
export class SchedulingOndemandComponent implements OnInit {
  
  schedulerName: any;
  meridian = true;
  defaultTime = {hour: 13, minute: 30};
  onetimeDate:any;
  // @Input() JobObject:JobSchedule;
  // @Output() selectDate=new EventEmitter<JobSchedule>();
  // @Output() Message=new EventEmitter<string>();
  finalMessage="";
  sDate="";
  sTime="";
  isEnable = true;
  flagNext=false;
  success=false;
  error=false;
  popmessage="";
  
  Job = new JobSchedule();
  
  constructor( private data: OndemandJobData, public ServiceURL: ERService,public router:Router) {
    this.onetimeDate = "2017-11-25";
    this.Job.active_end_date = "9999-12-31";
    this.Job.active_end_time = 235959;
    this.Job.active_start_date = "9999-12-31"
    this.Job.active_start_time = 0;
    this.Job.Enable = 1;
    this.Job.Freq_Interval = 0;
    this.Job.freq_recurrence_factor = 0;
    this.Job.freq_relative_interval = 0;
    this.Job.freq_subday_interval = 0;
    this.Job.Freq_Subday_Type = 0;
    this.Job.Freq_Type = 1;
    this.Job.JobId = this.data.selectedJob.JobID;
    this.Job.JobName = this.data.selectedJob.JobName;
    this.schedulerName = this.data.selectedJob.JobName;
    this.sendTime();
    console.log('Const: ' + JSON.stringify( this.Job));
    
  }
  
  ngOnInit() {
  }

  sendDate()
  {
    // this.job=this.JobObject;
    
    let _year=String(this.onetimeDate["year"]);
    let _month=String(this.onetimeDate["month"]).length==1?"0"+String(this.onetimeDate["month"]):String(this.onetimeDate["month"]);
    let _day=String(this.onetimeDate["day"]).length==1?"0"+String(this.onetimeDate["day"]):String(this.onetimeDate["day"]);
    this.Job.active_start_date=_year+"-"+_month+"-"+_day

    let _hh=String(this.defaultTime["hour"]);
    let _mi=String(this.defaultTime["minute"]).length==1?"0"+String(this.defaultTime["minute"]):String(this.defaultTime["minute"]);
    let _sec="00";

    this.sDate=_day+"/"+_month+"/"+_year;
    this.sTime=_hh+":"+_mi;
    this.Job.active_start_time=Number(_hh+_mi+_sec);
    // this.selectDate.emit(this.job);
    this.finalMessage="Occurs on "+this.sDate+" at "+this.sTime;
    // this.Message.emit(this.outputMessage);
    console.log('sendate: ' + JSON.stringify( this.Job));
    
  }

  sendTime()
  {
    // this.job=this.JobObject;
    let _hh=String(this.defaultTime["hour"]);
    let _mi=String(this.defaultTime["minute"]).length==1?"0"+String(this.defaultTime["minute"]):String(this.defaultTime["minute"]);
    let _sec="00";
    this.Job.active_start_time=Number(_hh+_mi+_sec);
    this.sTime=_hh+":"+_mi;
    this.finalMessage="Occurs on "+this.sDate+" at "+this.sTime;
    console.log('sendTime: ' + JSON.stringify( this.Job));
    // this.selectDate.emit(this.job);
    // this.Message.emit(this.outputMessage);
  }
  
  onSave() {
    if (this.isEnable) {
      this.Job.Enable = 1;
    }
    else {
      this.Job.Enable = 0;
    }
    this.flagNext=true;
    console.log('post-job:= ' + JSON.stringify(this.Job));
    this.ServiceURL.OndemandJobScheduling(this.Job)
      .subscribe((data) => {
       this.popmessage=data;
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
    this.data.Isback = true;
     this.router.navigate(['../ondemand-job']);
  }

  onClose(){
    this.data.Isback = false;
    this.router.navigate(['../ondemand-job']);
  }

}
