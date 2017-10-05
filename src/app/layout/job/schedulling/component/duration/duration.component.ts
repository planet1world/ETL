import { Component, OnInit, Input, Output, EventEmitter,ViewChild } from '@angular/core';
import { OnceTime, JobSchedule } from '../../../../../modal';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {

  selectedOption="date";
  outputMessage="";
  constructor() { }
  @Input() JobObject: JobSchedule;
  @Output() Duration = new EventEmitter<JobSchedule>();
  @Output() Message=new EventEmitter<string>();
  Job=new JobSchedule();
  startDate:any;
  endDate:any;
  sDate="";
  eDate="";
  flagCal=false;
  ngOnInit() {
  }

  startDateChange()
  {
    this.Job = this.JobObject;
    let _year=String(this.startDate["year"]);
    let _month=String(this.startDate["month"]).length==1?"0"+String(this.startDate["month"]):String(this.startDate["month"]);
    let _day=String(this.startDate["day"]).length==1?"0"+String(this.startDate["day"]):String(this.startDate["day"]);
    this.Job.active_start_date=_year+"-"+_month+"-"+_day;
    this.Duration.emit(this.Job);
    this.sDate=_day+"/"+_month+"/"+_year;
    let currentDate = new Date();    
    this.outputMessage="Schedule will be used starting on "+this.sDate ;  
    this.Message.emit(this.outputMessage);
  }
  endDateChange()
  {
    this.Job = this.JobObject;
    let _year=String(this.endDate["year"]);
    let _month=String(this.endDate["month"]).length==1?"0"+String(this.endDate["month"]):String(this.endDate["month"]);
    let _day=String(this.endDate["day"]).length==1?"0"+String(this.endDate["day"]):String(this.endDate["day"]);
    this.Job.active_end_date=_year+"-"+_month+"-"+_day;
    this.Duration.emit(this.Job);
    this.eDate=_day+"/"+_month+"/"+_year;

    this.outputMessage= "Schedule will be used between "+ this.sDate+" and " +this.eDate;
    this.Message.emit(this.outputMessage);    
  }
  RadioChange(ev) {
    if (ev.target.value == "date") {
      this.flagCal = false;
      this.outputMessage= "Schedule will be used between "+ this.sDate+" and " +this.eDate;
      
    } else {
      this.flagCal = true;
      this.Job.active_end_date="9999-12-31";
      this.Duration.emit(this.Job);  
      this.outputMessage="Schedule will be used starting on "+this.sDate  ;
      this.Message.emit(this.outputMessage);  
    }
  }

}
