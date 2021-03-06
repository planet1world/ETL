import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Job, ExtractControl } from '../../../modal/job.modal';
import { ETLJobQueue } from '../../../modal/ETLJobQueue.Model';
import { ERService } from '../../../shared/services/er-service.service';
import { OndemandJobData } from '../../../shared/data/ondemand-job-data';

@Component({
  selector: 'app-ondemand-job',
  templateUrl: './ondemand-job.component.html',
  styleUrls: ['./ondemand-job.component.css']
})
export class OndemandJobComponent implements OnInit {
    
  setPg = 0;
  setProp = 0;
  setProd = 0;
  setJob = 0;
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
  // job : Job[];
  sor : Job;
  showjob = false;
  warning = false;
  showDialog=false;
  error = false;
  popmessage='';
  extractControls : ExtractControl[];
  extractControlsChanged : ExtractControl[] = [];
  loadcontrol = false;
  loadTable = false;
  flagRun = false;

  selectedPgId : number = 0;
  selectedPropertyId : number = 0;
  selectedProductId : number = 0;
  selectedJobId : number = 0;

  flagAdd = false;
  flagRemove = false;

  constructor(public ServiceURL: ERService, public router: Router, private data: OndemandJobData) { 
    if(this.data.Isback != null && this.data.Isback){
      this.selectedPgId = this.data.selectedJob.PropertyGroupId;
      this.selectedPropertyId = this.data.selectedJob.PropertyId; 
      this.selectedProductId = this.data.selectedJob.ProductId;
       this.propertygroup = this.data.PropertyGroup;
       this.property = this.data.Property ;
       this.propertyList = this.data.Property.filter(prlist => prlist.PropertyGroupID == this.selectedPgId) ;
       this.product = this.data.Product;
       this.productList = this.data.Product.filter(prodlist => prodlist.PropertyID == this.selectedPropertyId);
       this.jobList = this.data.Job ;
       this.setPg = this.data.selectedJob.PropertyGroupId;
       this.setProp = this.data.selectedJob.PropertyId;
       this.setProd = this.data.selectedJob.ProductId;
       this.setJob = this.data.selectedJob.JobID;

       this.onChangeJob(this.data.selectedJob.JobID);
    }
    else{
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.getProductData();
    }
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
        this.data.PropertyGroup = data;
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
        this.data.Property = data;
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
        this.data.Product = data;
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
        this.data.Job = data;
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
    this.setPg = id;
    this.selectedPgId = id;
    this.setProp = 0;
    this.setProd = 0;
    this.setJob = 0;
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
    this.setProd = 0;
    this.setJob = 0;
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
    this.selectedProductId = id;;
    this.setJob = 0;
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
        this.loadcontrol = false;  
      }
      else {
        let selectedJob = this.jobList.filter(selected => selected.JobID == id);
        this.data.selectedJob = selectedJob[0];
        this.data.selectedJob.PropertyGroupId = this.selectedPgId;
        this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
      }
    }
  }

  getListOfExtractControls(jobid : number, productid : number){
    this.loadcontrol = true;    
    this.extractControlsChanged = [];
    this.ServiceURL.GetListOfExtractControls(jobid, productid)
      .subscribe(
      (data: ExtractControl[]) => {
        this.extractControls = data;
        this.loadcontrol = false;
        this.loadTable = true;
        
      },
      (error) => {
        const errorData = error.json();
        this.loadcontrol = false;
        
      });
  }

  onChangeSelect(ec: ExtractControl, event)
  {
    let changed = event.target.checked
    if(changed)
    {
      this.extractControlsChanged.push( ec);
      
    }
    else
    {
      const index = this.extractControlsChanged.indexOf(ec);
      if(index !== -1)
      {
        this.extractControlsChanged.splice(index, 1);
      }
    }
  }
  
  onAddSelected()
  {
    this.flagAdd = true;
    if(this.extractControlsChanged.length > 0)
    {
      this.ServiceURL.AddSelectedInQueue(this.extractControlsChanged)
      .subscribe(
      (data) => {
        this.popmessage=data;      
        this.showDialog=true;
        this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
        this.flagAdd = false;

      },
      (error) => {
        const errorData = error.json();
        this.popmessage=errorData.Message; 
        this.error = true;
        console.log('error:', errorData.Message);
        this.flagAdd = false;

      });
    }
    else{
      this.popmessage="Please select at least on row"; 
      this.error = true;
      this.flagAdd = false;
    }
  }

  onRemoveSelected() {
    if(this.extractControlsChanged.length > 0){
    this.warning = true;
    }
    else{
      this.popmessage="Please select at least on row"; 
      this.error = true;
      this.flagAdd = false;
    }
  }

  onDeleteConfirmation() {
    this.flagRemove = true;
    this.ServiceURL.RemoveSelectedFromQueue(this.extractControlsChanged)
    .subscribe(
    (data) => {
      this.popmessage=data;      
      this.showDialog=true;
      this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
      this.warning = false;
      this.flagRemove = false;

    },
    (error) => {
      const errorData = error.json();
      this.popmessage=errorData.Message; 
      this.error = true;
      this.warning = false;
      console.log('error:', errorData.Message);
      this.flagRemove = false;

    });
  }
  
  onNo() {
    this.warning = false;
    this.flagRemove = false;
  }

  onCancel()
  {
    this.loadTable = false;
    this.propertyList = [];
    this.productList = [];
    this.jobList = [];
    this.extractControlsChanged = [];
    this.setPg = 0;
  }

  onSetSchedule()
  {
    this.router.navigate(['../scheduling-ondemand']);
  }

  onRunnow()
  {
    this.flagRun = true;
    this.ServiceURL.OnDemandRunNow(this.data.selectedJob)
    .subscribe(
    (data) => {
      this.popmessage=data;      
      this.showDialog=true;
      this.flagRun = false;

    },
    (error) => {
      const errorData = error.json();
      this.popmessage=errorData.Message; 
      this.error = true;
      console.log('Runnowerror:', errorData.Message);
      this.flagRun = false;

    });
  }
  
}
