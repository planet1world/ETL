import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ETLJobQueue } from '../../../modal/ETLJobQueue.Model';
import { ERService } from '../../../shared/services/er-service.service';

@Component({
  selector: 'app-running-jobs',
  templateUrl: './running-jobs.component.html',
  styleUrls: ['./running-jobs.component.css']
})
export class RunningJobsComponent implements OnInit {

  error = false;
  popmessage = '';
  flagView = false;
  etlJobQueueList : ETLJobQueue[] = [];

  constructor(public ServiceURL: ERService) { 
    this.onViewRunningJobs();
  }

  ngOnInit() {
  }
  
  onViewRunningJobs()
  {
    this.flagView = true;
    this.ServiceURL.GetRunningJobs()
    .subscribe(
    (data : ETLJobQueue[]) => {
      this.etlJobQueueList = data;      
      this.flagView = false;
    },
    (error) => {
      const errorData = error.json();
      console.log('error:', errorData.Message);
      this.flagView = false;
    });
  }
 
}
