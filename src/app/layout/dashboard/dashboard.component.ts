import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ERService } from '../../shared/services/er-service.service';
import { OndemandJobData } from '../../shared/data/ondemand-job-data';
import { DashboardModel } from '../../modal/Dashboard.Model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    connCount : number = 0;
    propCount : number = 0;
    jobsCount : number = 0;
    runJobsCount : number = 0;
     public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: '#5B9BD5',
    //   borderColor: 'rgba(148,159,177,1)',
    //   pointBackgroundColor: 'rgba(148,159,177,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
     ];
     // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    public barChartLabels: string[] = []; // ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'];
      public barChartLabelsMonth: string[] = []; //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [{data: [], label:'Weekdays'}]; //[{data: [5, 10,5, 4, 5,15, 12], label: 'Series A'}];

     public barChartDataMonth: any[] = [{data: [], label:'Months'}]; //[ {data: [5, 10,5, 4, 5,15, 12,20,14,20,25,30], label: 'Series A'}];
    // Doughnut
    public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData: number[] = [350, 450, 100];
    public doughnutChartType: string = 'doughnut';
    // Radar
    // public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
    // public radarChartData: any = [
    //     {data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A'},
    //     {data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B'}
    // ];

    constructor(public service: AuthService, public router: Router, private ondemandJobData : OndemandJobData, public ServiceURL: ERService) {
        this.ondemandJobData.Isback = null;
     
        if (!service.isAuthenticated())
            this.router.navigate(['./login']);
       
        this.sliders.push({
            imagePath: 'assets/images/slider1.jpg',
            label: 'First slide label',
            text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
        }, {
            imagePath: 'assets/images/slider2.jpg',
            label: 'Second slide label',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }, {
            imagePath: 'assets/images/slider3.jpg',
            label: 'Third slide label',
            text: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
        });

        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`,
        }, {
            id: 2,
            type: 'warning',
            message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`,
        });
    }
    onSource(message:any):void
    {
        console.log('event');
         this.router.navigate(['./connectionmanager']);
    }

    onProperties(message:any):void
    {
        console.log('event');
         this.router.navigate(['./property-manager']);
    }

    onJobs(message:any):void
    {
        console.log('event');
         this.router.navigate(['./list-job']);
    }

    onRunningJobs(message:any):void
    {
        console.log('event');
         this.router.navigate(['./job-history']);
    }

    ngOnInit() {
        this.getDashboardData();
    }

    getDashboardData()
    {
        this.ServiceURL.GetDashboardData()
        .subscribe(
        (data : DashboardModel) => {
            console.log("data: " + JSON.stringify( data));
            this.connCount = data.SourceConnsCount;
            this.propCount = data.PropertiesCount;
            this.jobsCount = data.JobsCount;
            this.runJobsCount = data.RunningJobsCount;
            this.barChartLabels = data.WeekDays;
            this.barChartData[0].data = data.WeekDaysValue;
            console.log("this.barChartData[data]: " + JSON.stringify(  data.YearMonthsValue));
            this.barChartDataMonth[0].data = data.YearMonthsValue;
            this.barChartLabelsMonth = data.YearMonths;
            console.log("this.barChartDataMonth[data]: " + JSON.stringify( this.barChartDataMonth));
        },
        (error) => {
          const errorData = error.json();
          console.log('error:', errorData.Message);
        });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

      // events
    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

    // public randomize(): void {
    //     // Only Change 3 values
    //     const data = [
    //         Math.round(Math.random() * 100),
    //         59,
    //         80,
    //         (Math.random() * 100),
    //         56,
    //         (Math.random() * 100),
    //         40
    //     ];
    //     const clone = JSON.parse(JSON.stringify(this.barChartData));
    //     clone[0].data = data;
    //     this.barChartData = clone;
    // }
}
