import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import {OnceTime,JobSchedule} from  '../../../../../modal';

@Component({
  selector: 'app-onetime',
  templateUrl: './onetime.component.html',
  styleUrls: ['./onetime.component.css']
})
export class OnetimeComponent implements OnInit {
  meridian = true;
  defaultTime = {hour: 13, minute: 30};
  onetimeDate:any;
  job=new JobSchedule();
  @Input() JobObject:JobSchedule;
  @Output() selectDate=new EventEmitter<JobSchedule>();
  @Output() Message=new EventEmitter<string>();
  outputMessage="";
  sDate="";
  sTime="";
  
  constructor() {

   }

  ngOnInit() {
  }
  sendDate()
  {
    this.job=this.JobObject;
    
    let _year=String(this.onetimeDate["year"]);
    let _month=String(this.onetimeDate["month"]).length==1?"0"+String(this.onetimeDate["month"]):String(this.onetimeDate["month"]);
    let _day=String(this.onetimeDate["day"]).length==1?"0"+String(this.onetimeDate["day"]):String(this.onetimeDate["day"]);
    this.job.active_start_date=_year+"-"+_month+"-"+_day

    let _hh=String(this.defaultTime["hour"]);
    let _mi=String(this.defaultTime["minute"]).length==1?"0"+String(this.defaultTime["minute"]):String(this.defaultTime["minute"]);
    let _sec="00";
    

    this.sDate=_day+"/"+_month+"/"+_year;
    this.sTime=_hh+":"+_mi;
    this.job.active_start_time=Number(_hh+_mi+_sec);
    this.selectDate.emit(this.job);
    this.outputMessage="Occurs on "+this.sDate+" at "+this.sTime;
    this.Message.emit(this.outputMessage);

    
  }
  sendTime()
  {
    this.job=this.JobObject;
    let _hh=String(this.defaultTime["hour"]);
    let _mi=String(this.defaultTime["minute"]).length==1?"0"+String(this.defaultTime["minute"]):String(this.defaultTime["minute"]);
    let _sec="00";
    this.job.active_start_time=Number(_hh+_mi+_sec);
    this.sTime=_hh+":"+_mi;
    this.outputMessage="Occurs on "+this.sDate+" at "+this.sTime;
    this.selectDate.emit(this.job);
    this.Message.emit(this.outputMessage);
  }


}
