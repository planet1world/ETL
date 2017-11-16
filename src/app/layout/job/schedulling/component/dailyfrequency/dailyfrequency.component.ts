import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OnceTime, JobSchedule } from '../../../../../modal';

@Component({
  selector: 'app-dailyfrequency',
  templateUrl: './dailyfrequency.component.html',
  styleUrls: ['./dailyfrequency.component.css']
})
export class DailyfrequencyComponent implements OnInit {
  meridian = true;
  startTime = { hour: 13, minute: 30 };
  endTime = { hour: 23, minute: 59 };
  flagevery = true;
  flagonce = false;
  dayVal_day = 1;
  job = new JobSchedule();
  @Input() JobObject: JobSchedule;
  @Output() DailyFrequency=new EventEmitter<JobSchedule>();
  @Output() Message=new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  startTimeChange() {
    this.job = this.JobObject;
    let _hh = String(this.startTime["hour"]);
    let _mi = String(this.startTime["minute"]).length == 1 ? "0" + String(this.startTime["minute"]) : String(this.startTime["minute"]);
    let _sec = "00";
    this.job.active_start_time = Number(_hh + _mi + _sec);
    this.DailyFrequency.emit(this.job);
    this.Message.emit("at "+_hh +":"+ _mi +":"+ _sec)
  }

  endTimeChange() {
    this.job = this.JobObject;
    let _hh = String(this.endTime["hour"]);
    let _mi = String(this.endTime["minute"]).length == 1 ? "0" + String(this.endTime["minute"]) : String(this.endTime["minute"]);
    let _sec = "00";
    this.job.active_start_time = Number(_hh + _mi + _sec);
    this.DailyFrequency.emit(this.job);
  }


  RadioChange(ev) {
    console.log("Radio: " + ev.target.value);
    if (ev.target.value == "once") {
      this.flagevery = true;
      this.flagonce = false;
    } else  if (ev.target.value == "every") {
      this.flagonce = true;
      this.flagevery = false;
    }
  }
  onHourChange(value: number) {
    this.job = this.JobObject;
    this.job.Freq_Subday_Type = value;
    this.DailyFrequency.emit(this.job);
  }
  onDayChange() {
    this.job = this.JobObject;
    this.job.freq_subday_interval = this.dayVal_day;
    this.DailyFrequency.emit(this.job);
  }

}
