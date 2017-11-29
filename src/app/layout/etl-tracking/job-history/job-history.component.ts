import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Job } from '../../../modal/job.modal';
import { Product } from '../../../modal/product.modal';
import { JobQueueHist, JobQueueHistDetail, JobSearchParams } from '../../../modal/ETLJobQueue.Model';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-job-history',
  templateUrl: './job-history.component.html',
  styleUrls: ['./job-history.component.css']
})
export class JobHistoryComponent implements OnInit {

  setPg = 0;
  propertygroup: PropertyGroup[];
  pg: PropertyGroup[];
  showpropertygroup = false;
  propertyList : Property[];
  property: Property[];
  pro: Property[];
  showproperty = false;
  productList : Product[];
  product: Product[];
  showproduct = false;
  showHistory = false;
  showSubHistory = 0;
  jobHistList : JobQueueHist[] = [];
  jobExtControlHistList : JobQueueHistDetail[] = [];
  clicked = true;
  date1 = null;
  meridian = false;
  startTime = {hour: 0, minute: 0};
  startDate : any; 
  endTime = {hour: 23, minute: 59};
  endDate : any; 
  start : string;
  end : string;
  pageNumber = 1;
  preBtn = true;
  nxtBtn = false;
  jobName1 : string = '';

  flagSearch = false;
  flagSearch2 = false;
  showjob = false;

  @ViewChild('selectPG') selectPG;
  @ViewChild('selectProperty') selectProperty;
  @ViewChild('selectProduct') selectProduct;
  @ViewChild('jobName') jobName;
  @ViewChild('selectRecordsPerPage') selectRecordsPerPage;

  
  constructor(public ServiceURL: ERService, private data: Data, public datepipe: DatePipe) { 
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.getProductData();
    this.currentDate();
  }

  ngOnInit() {
  }
  getActivePropertyGroup() {
    const obj = new PropertyGroup();
    obj.Operation = 'GetRecordsByStatus';
    obj.Active = 1;
    this.showpropertygroup = true;
    this.ServiceURL.CreatePropertyGroup(obj)
      .subscribe(
      (data: PropertyGroup[]) => {
        this.propertygroup = data;
        this.showpropertygroup = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showpropertygroup = false;
      });
  }

  getPropertyData() {
    const obj = new Property();
    obj.Operation = 'GetInfo';
    this.showproperty = true;
    this.ServiceURL.PropertyOperation(obj)
      .subscribe(
      (data: Property[]) => {
        this.property = data;
        this.showproperty = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproperty = false;
      });
  }

  getProductData() {
    this.showproduct = true;
    const pro = new Product();
    pro.Operation = 'GetAllProduct';
    this.ServiceURL.PostProductOperation(pro)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
        this.showproduct = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproduct = false;
      });
  }

  onChangePG(id: number) {
    this.showproperty = true;
    this.setPg = id;
    this.pg = this.propertygroup.filter(item => item.ID == id);
    if (this.property.length > 0) {
      if (id == 0) {
        this.propertyList = [];
        this.productList = [];
      }
      else {
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
        this.productList = [];
      }
    }
    this.showproperty = false;
  }

  onChangeProperty(id: number) {
    this.showproduct = true;
    if (this.product.length > 0) {
      if (id == 0) {
        this.productList = [];
      }
      else {
        this.pro = this.property;
        this.pro = this.pro.filter(proprtylist => proprtylist.ID == id);
        this.productList = this.product.filter(productlist => (productlist.PropertyID == id) && (productlist.PropertyGroupName == this.pg[0].Name));
      }
    }
    this.showproduct = false;
  }

  onChangeProduct(id: number) {
    if (this.productList.length > 0) {
      if (id == 0) {
      }
      else {
        this.getAllJobs(this.selectProperty.nativeElement.value , id);
      }
    }
  }
  
  getAllJobs(propertyid : number, productid : number){
    this.showjob = true;
    this.ServiceURL.GetAllJobsForProduct(propertyid, productid)
      .subscribe(
      (data: Job[]) => {
        if(data.length > 0){
        this.jobName1 = data[0].JobNameWithoutID;
        }
        this.showjob = false;
    
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showjob = false;
    
      });
  }

  onSearch( srch : string)
  {
    if(srch=='search'){
      this.pageNumber =  1;
      this.flagSearch = true;
      this.nxtBtn = false;
    }
   
    let searchParams = new JobSearchParams();
    searchParams.PropertyGroupID = this.selectPG.nativeElement.value;  
    searchParams.PropertyID = this.selectProperty.nativeElement.value ;  
    searchParams.ProductID = this.selectProduct.nativeElement.value;  
    searchParams.JobName = this.jobName.nativeElement.value;  
    searchParams.RecodsPerPage = this.selectRecordsPerPage.nativeElement.value ;  
    searchParams.StartDatetime = this.start ;  
    searchParams.EndDatetime = this.end ; 
    searchParams.PageNumber = this.pageNumber ;  
    this.ServiceURL.GetExtractJobHistory(searchParams)
    .subscribe(
      (data: JobQueueHist[]) => {
        this.jobHistList = data;
        this.disableNextPreButton(data);
        this.flagSearch = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.flagSearch = false;
      });

    this.showHistory = true;
  }

  onExpand(id : any)
  {
    if(this.clicked == true)
    {
      this.showSubHistory = id;
      this.getExtractControlJobHistory(id);
      this.clicked = false;
    }
    else
    {
      this.showSubHistory = 0;
      this.clicked = true;
    }
  }

  getExtractControlJobHistory(jobHistID : number)
  {
    this.flagSearch2 = true;
    this.ServiceURL.GetExtractControlJobHistory(jobHistID)
    .subscribe(
      (data: JobQueueHistDetail[]) => {
        this.jobExtControlHistList = data;
        this.flagSearch2 = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.flagSearch2 = false;
      });
  }

  sendStartTime()
  {
    this.sendStartDate();
  }

  sendStartDate()
  {
    let _year=String(this.startDate["year"]);
    let _month=String(this.startDate["month"]).length==1?"0"+String(this.startDate["month"]):String(this.startDate["month"]);
    let _day=String(this.startDate["day"]).length==1?"0"+String(this.startDate["day"]):String(this.startDate["day"]);

    let _hh=String(this.startTime["hour"]).length==1?"0"+String(this.startTime["hour"]):String(this.startTime["hour"]);
    let _mi=String(this.startTime["minute"]).length==1?"0"+String(this.startTime["minute"]):String(this.startTime["minute"]);
    let _sec="00";

    this.start = _year+ "-" + _month + "-" + _day +" " +  _hh + ":"+ _mi + ":"+ _sec;
  }

  sendEndTime()
  {
    this.sendEndDate();
  }

  sendEndDate()
  {
    let _year=String(this.endDate["year"]);
    let _month=String(this.endDate["month"]).length==1?"0"+String(this.endDate["month"]):String(this.endDate["month"]);
    let _day=String(this.endDate["day"]).length==1?"0"+String(this.endDate["day"]):String(this.endDate["day"]);

    let _hh=String(this.endTime["hour"]).length==1?"0"+String(this.endTime["hour"]):String(this.endTime["hour"]);
    let _mi=String(this.endTime["minute"]).length==1?"0"+String(this.endTime["minute"]):String(this.endTime["minute"]);
    let _sec="00";

    this.end = _year+ "-" + _month + "-" + _day +" " +  _hh + ":"+ _mi + ":"+ _sec;
  }

  currentDate(){
    var date=new Date();
    this.startDate = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()}
    this.endDate = {year: date.getFullYear(), month: date.getMonth()+1, day: date.getDate()}
    this.sendStartDate();
    this.sendEndDate();
   }

   onNextRecord()
   {
      this.pageNumber = this.pageNumber + 1;
      this. onSearch('nosearchclick');
   }

   disableNextPreButton(data: JobQueueHist[])
   {
     let records = this.selectRecordsPerPage.nativeElement.value
      if(data.length < records)
      {
        this.nxtBtn = true;
      }

      if(this.pageNumber == 1 )
      {
        this.preBtn = true;
      }else{
        this.preBtn = false;
      }

   }

   onPreRecord()
   {
      this.pageNumber = this.pageNumber - 1;
      this. onSearch('nosearchclick');
      this.nxtBtn = false;
   }


}
