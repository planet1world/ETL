import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { OnceTime, JobSchedule } from '../../../../../modal';

@Component({
  selector: 'app-frequency',
  templateUrl: './frequency.component.html',
  styleUrls: ['./frequency.component.css']
})
export class FrequencyComponent implements OnInit {
  selectedFrequency = 4;
  daysVal_RecurEvery = 1;
  weeksVal_RecurEvery = 1;
  day_day = 1;
  day_month = 1;
  the_month = 1;
  daycount: Array<number> = [];
  flagDay = false;
  flagThe = true;
  job = new JobSchedule();
  @Input() JobObject: JobSchedule;
  @Output() Frequency = new EventEmitter<JobSchedule>();
  @Output() Message = new EventEmitter<string>();
  outputMessage = "";

  @ViewChild('frequencyDD') frequencyDD;
  @ViewChild('ddMonthlydaypart') ddMonthlydaypart;
  @ViewChild('weekdayDD') weekdayDD;

  constructor() {

  }


  ngOnInit() {
    this.job = this.JobObject;
    this.job.Freq_Type = this.selectedFrequency;
    this.outputMessage = "Occurs every day";
    this.job.Freq_Interval = this.daysVal_RecurEvery;
    this.Frequency.emit(this.job);
    this.Message.emit(this.outputMessage);
  }
  onFrequencyChange(value: number) {
    this.selectedFrequency = value;
    this.job = this.JobObject;
    this.job.Freq_Type = this.selectedFrequency;
    if (value == 4) {
      if (this.daysVal_RecurEvery != 1) {
        this.outputMessage = "Occurs every" + this.daysVal_RecurEvery + " day(s) ";
      }
      else {
        this.outputMessage = "Occurs every day";
      }
    } else if (value == 8) {
      if (this.weeksVal_RecurEvery != 1) {
        this.outputMessage = "Occurs every" + this.weeksVal_RecurEvery + " week(s) ";
      }
      else {
        this.outputMessage = "Occurs every week ";
      }


    } else if (value == 16) {
      if (this.day_month != 1) {
        this.outputMessage = "Occurs every "+ this.day_month + " month(s) on day "+ this.day_day+ " of that month ";
      }
      else {
        this.outputMessage = "Occurs every month on day " + this.day_day;
      }

    }

    this.messageEmit(this.outputMessage);
  }
  onChangeDailyDate(value: number) {
    this.job = this.JobObject;
    this.job.Freq_Interval = this.daysVal_RecurEvery;
    this.Frequency.emit(this.job);
    if (this.daysVal_RecurEvery != 1) {
      this.outputMessage = "Occurs every" + this.daysVal_RecurEvery + " day(s) ";
    }
    else {
      this.outputMessage = "Occurs every day";
    }
    this.Message.emit(this.outputMessage);

  }
  //---------------------------------------------------------------///
  onChangeWeeklyRecurrenceFactor(value: number) {
    this.job = this.JobObject;
    this.job.freq_recurrence_factor = this.weeksVal_RecurEvery;
    this.Frequency.emit(this.job);
    if (this.weeksVal_RecurEvery != 1) {
      this.outputMessage = "Occurs every" + this.weeksVal_RecurEvery + " week(s)   ";
    }
    else {
      this.outputMessage = "Occurs every week ";
    }
    this.messageEmit(this.outputMessage+" "+ this.weekDisplayMessage());
  }


messageEmit(value:string)
{
  this.Message.emit(value);
}

  onDayChange(ev) {
    let total = 0;
    if (ev.target.checked) {
      this.daycount.push(ev.target.value);
    }
    else {
      const index: number = this.daycount.indexOf(ev.target.value);
      if (index !== -1) {
        this.daycount.splice(index, 1);
      }
    }
    
    for (let i in this.daycount) { total += Number(this.daycount[i]);     
    }
    this.job = this.JobObject;
    this.job.Freq_Interval = total;
    this.Frequency.emit(this.job);
    this.messageEmit(this.outputMessage+" "+ this.weekDisplayMessage());
  }
  weekDisplayMessage()
  {
    if(this.daycount.length>0)
    {
      let dayMessage="on ";
      
          this.daycount.sort(function (a, b) { // sort object by id field
            return a - b
        })
          for (let i in this.daycount) {;
              dayMessage=dayMessage+(this.caseDay(String(this.daycount[i])))+",";
              }
                return dayMessage;

    }
   
    
  }

  caseDay(value:string)
  {
    switch(value)
    {
      case "2":{
        return "Monday";
      }
      case "4":{
        return "Tuesday";
      }
      case "8":{
        return "Wednesday";
      }
      case "16":{
        return "Thrusday";
      }
      case "32":{
        return "Friday";
      }
      case "64":{
        return "Saturday";
      }
      case "1":{
        return "Sunday";
      }
    }
  }
  //-------------------------------------------------------------------//
  RadioChange(ev) {
    this.job = this.JobObject;
    if (ev.target.value == "the") {
      this.flagDay = true;
      this.flagThe = false;
      this.job.freq_relative_interval = this.ddMonthlydaypart.nativeElement.value;
      this.job.freq_recurrence_factor = this.the_month;
      this.job.Freq_Interval = this.weekdayDD.nativeElement.value;
      this.messageEmit("Occurs every first Monday of every 1 month(s)"); 

    } else {
      this.flagThe = true;
      this.flagDay = false;
    }
  }
  onDayFreqInterval() {
    this.job = this.JobObject;
    this.job.freq_recurrence_factor = this.day_month;
    this.job.Freq_Interval = this.day_day;
    this.Frequency.emit(this.job);
    this.messageEmit("Occurs every "+ this.day_month + " month(s) on day "+ this.day_day+ " of that month ");

  }
  onDayMonthFreqRecFactor() {
    this.job = this.JobObject;
    this.job.freq_recurrence_factor = this.day_month;
    this.job.Freq_Interval = this.day_day;
    this.Frequency.emit(this.job);
    this.messageEmit("Occurs every "+ this.day_month + " month(s) on day "+ this.day_day+ " of that month ");
  }
  onMonthlyChange(value: number) {
    this.job = this.JobObject;
    this.job.freq_relative_interval = value;
    this.job.freq_recurrence_factor = this.the_month;
    this.Frequency.emit(this.job);
  }
  onWeekDayChange(value: number) {
    this.job = this.JobObject;
    this.job.Freq_Interval = value;
    this.job.freq_recurrence_factor = this.the_month;
    this.Frequency.emit(this.job);
  }
  onMonthChange() {
    this.job = this.JobObject;
    this.job.freq_recurrence_factor = this.the_month;
    this.Frequency.emit(this.job);
  }
}
