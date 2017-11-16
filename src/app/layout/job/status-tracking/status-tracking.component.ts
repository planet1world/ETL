import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Job, ExtractControl } from '../../../modal/job.modal';
import { ETLJobQueue } from '../../../modal/ETLJobQueue.Model';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';
import { OndemandJobData } from '../../../shared/data/ondemand-job-data';

@Component({
  selector: 'app-status-tracking',
  templateUrl: './status-tracking.component.html',
  styleUrls: ['./status-tracking.component.css']
})
export class StatusTrackingComponent implements OnInit {
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
  jobList : Job[];
  job : Job[];
  sor : Job;
  showjob = false;
  warning = false;
  showDialog=false;
  error = false;
  popmessage='';
  loadcontrol = false;
  loadTable = false;

  selectedPropertyId : number = 0;
  selectedProductId : number = 0;
  selectedJobId : number = 0;

  etlJobQueueList : ETLJobQueue[];
  loadEtlTable = false;

  flagAdd = false;
  flagRemove = false;
  flagView = false;

  constructor(public ServiceURL: ERService, public router: Router, private data: Data, private ondemandJobData : OndemandJobData) {
    this.ondemandJobData.Isback = null; 
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.getProductData();
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
    this.showjob = true;
    const pro = new Product();
    pro.Operation = 'GetAllProduct';
    this.ServiceURL.PostProductOperation(pro)
      .subscribe(
      (data: Product[]) => {
        this.product = data;
        this.showproduct = false;
        this.showjob = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproduct = false;
        this.showjob = false;
      });
  }

  getAllJobs(propertyid : number, productid : number){
    this.showjob = true;
    this.ServiceURL.GetAllJobsForProduct(propertyid, productid)
      .subscribe(
      (data: Job[]) => {
        this.jobList = data;
        console.log("jobs: =  " + JSON.stringify( data));
        this.job = data;
        this.showjob = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showjob = false;
      });
  }

  onChangePG(id: number) {
    this.showproperty = true;
    console.log('any:', id)
    this.pg = this.propertygroup.filter(item => item.ID == id);
    if (this.property.length > 0) {
      if (id == 0) {
        this.propertyList = [];
        this.productList = [];
        this.jobList = [];
      }
      else {
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
        this.productList = [];
        this.jobList = [];
      }
    }
    this.showproperty = false;
  }
  onChangeProperty(id: number) {
    this.showproduct = true;
    this.selectedPropertyId = id;
    if (this.product.length > 0) {
      if (id == 0) {
        this.productList = [];
        this.jobList = [];
      }
      else {
        this.pro = this.property;
        this.pro = this.pro.filter(proprtylist => proprtylist.ID == id);
        this.productList = this.product.filter(productlist => (productlist.PropertyID == id) && (productlist.PropertyGroupName == this.pg[0].Name));
        this.jobList = [];
      }
    }
    this.showproduct = false;
  }

  onChangeProduct(id: number) {
    this.selectedProductId = id;
    if (this.productList.length > 0) {
      if (id == 0) {
        this.jobList = [];
      }
      else {
        this.getAllJobs(this.selectedPropertyId , this.selectedProductId);
      }
    }
  }

  onChangeJob(id : number)
  {
    this.selectedJobId = id;
    if (this.jobList.length > 0) {
      if (id == 0) {
        // this.jobList = [];
      }
      else {
        // this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
      }
    }
  }

  onViewEtl()
  {
    this.flagView = true;
    this.ServiceURL.ViewEtlQueue()
    .subscribe(
    (data : ETLJobQueue[]) => {
      console.log("ViewEtlQueueForSelectedTableOndemandJob: =  " + JSON.stringify( data));
      this.etlJobQueueList = data;      
      this.flagView = false;
      this.loadEtlTable = true;
    },
    (error) => {
      const errorData = error.json();
      this.popmessage=errorData.Message; 
      console.log('error:', errorData.Message);
      this.flagView = false;
      this.loadEtlTable = false;
      this.error = true;

    });
  }
 
  onCancelEtl()
  {
    this.etlJobQueueList = [];
    this.loadEtlTable = false;
  }
}

