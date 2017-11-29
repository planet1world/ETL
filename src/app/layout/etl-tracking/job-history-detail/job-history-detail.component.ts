import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Job } from '../../../modal/job.modal';
import { Product } from '../../../modal/product.modal';
import { JobQueueHist, JobQueueHistDetail, ExtractControlTable, JobSearchParams } from '../../../modal/ETLJobQueue.Model';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-history-detail',
  templateUrl: './job-history-detail.component.html',
  styleUrls: ['./job-history-detail.component.css']
})

export class JobHistoryDetailComponent implements OnInit {

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
  jobHistList : JobQueueHist[] = [];
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
  jobList : Job[];
  jobIDVal : string = '';
  sourceTableList : ExtractControlTable[];
  destTableList : ExtractControlTable[];
  showsource = false;
  showdest = false;
  sorval : string = "";
  destval : string = "" ;
  resetSor = '0';
  resetDest = '0';
  resetjob = '0';

  flagSearch = false;
  showjob = false;

  @ViewChild('selectPG') selectPG;
  @ViewChild('selectProperty') selectProperty;
  @ViewChild('selectProduct') selectProduct;
  @ViewChild('selectJob') jobName;
  @ViewChild('jobID') jobID;
  @ViewChild('jobRunID') jobRunID;
  @ViewChild('selectSource') selectSource;
  @ViewChild('selectDest') selectDest;
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
        this.sourceTableList = [];
        this.destTableList = [];
      }
      else {
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
        this.getAllSorTables();
        this.getAllDestTables();
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
      this.getAllSorTables();
      this.getAllDestTables();
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
      this.getAllSorTables();
      this.getAllDestTables();
    }
  }
  
  getAllSorTables(){
    this.showsource = true;
    let pgID = this.selectPG.nativeElement.value;
    let propID = this.selectProperty.nativeElement.value;
    let prodID = this.selectProduct.nativeElement.value;
    let jbname = this.jobName.nativeElement.value;
    this.ServiceURL.GetAllSourceTables(pgID, propID, prodID, jbname)
      .subscribe(
      (data: ExtractControlTable[]) => {
        this.sourceTableList = data;
        this.showsource = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showsource = false;
    
      });
  }
  
  getAllDestTables(){
    this.showdest = true;
    let pgID = this.selectPG.nativeElement.value;
    let propID = this.selectProperty.nativeElement.value;
    let prodID = this.selectProduct.nativeElement.value;
    let jbname = this.jobName.nativeElement.value;
    this.ServiceURL.GetAllDestinationTables(pgID, propID, prodID, jbname)
      .subscribe(
      (data: ExtractControlTable[]) => {
        this.destTableList = data;
        this.showdest = false;
    
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showdest = false;
      });
  }

  getAllJobs(propertyid : number, productid : number){
    this.showjob = true;
    this.ServiceURL.GetAllJobsForProduct(propertyid, productid)
      .subscribe(
      (data: Job[]) => {
        this.jobList = data;
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
    searchParams.ProductID = this.selectProduct.nativeElement.value ;  
    searchParams.JobName = this.jobName.nativeElement.value == "0" ? '' : this.jobName.nativeElement.value;
    searchParams.JobID = this.jobID.nativeElement.value ;  
    searchParams.JobRunID = this.jobRunID.nativeElement.value ; 
    searchParams.SourceTableName = this.selectSource.nativeElement.value != "0" ?  this.selectSource.nativeElement.value : this.sorval; 
    searchParams.DestinationTableName = this.selectDest.nativeElement.value != "0" ?  this.selectDest.nativeElement.value : this.destval; 
    searchParams.RecodsPerPage = this.selectRecordsPerPage.nativeElement.value ;  
    searchParams.StartDatetime = this.start ;  
    searchParams.EndDatetime = this.end ; 
    searchParams.PageNumber = this.pageNumber ;  
    this.ServiceURL.GetExtractJobHistoryDetail(searchParams)
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

  onChangeSource(sor : string){
    this.sorval = ""; 
    this.resetSor = sor;
  }
    
  onSorTyping(sortxt : string){
    this.sorval = sortxt;
    this.resetSor = '0';
  }
  
  onChangeDest( dest : string ){
    this.destval = "";
    this.resetDest = dest;
  }

  onDestTyping(destxt : string){
    this.destval = destxt;
    this.resetDest = '0';
  }
    
  onChangeJob( job : string ){
    this.jobIDVal = "";
    this.resetjob = job;
  }

  onJobIDTyping(jobidtxt : string){
    this.jobIDVal = jobidtxt;
    this.resetjob = '0';
  }

}
