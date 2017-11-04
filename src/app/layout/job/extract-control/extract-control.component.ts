import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Job, ExtractControl } from '../../../modal/job.modal';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-extract-control',
  templateUrl: './extract-control.component.html',
  styleUrls: ['./extract-control.component.css']
})
export class ExtractControlComponent implements OnInit {

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
  extractControls : ExtractControl[];
  extractControlsChanged : ExtractControl[] = [];
  loadcontrol = false;
  loadTable = false;

  selectedPropertyId : number = 0;
  selectedProductId : number = 0;
  selectedJobId : number = 0;

  flagInactive = false;
  flagDelete = false;

  constructor(public ServiceURL: ERService, public router: Router, private data: Data) { 
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
        console.log("extractControls: =  " + JSON.stringify( data));
        this.loadcontrol = false;
        this.loadTable = true;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.loadcontrol = true;
        
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
    console.log("this.extractControlsChanged: =  " + JSON.stringify( this.extractControlsChanged));

  }
  
  onSetInactive()
  {
    this.flagInactive = true;
    if(this.extractControlsChanged.length > 0){
      this.ServiceURL.SetInactiveExtControls(this.extractControlsChanged)
      .subscribe(
      (data) => {
        console.log('setInactive:= ', data);
        this.popmessage=data;      
        this.showDialog=true;
        this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
        this.flagInactive = false;

      },
      (error) => {
        const errorData = error.json();
        this.popmessage=errorData.Message; 
        this.error = true;
        console.log('error:', errorData.Message);
        this.flagInactive = false;

      });
    }
    else{
      this.popmessage="Please select at least on row"; 
      this.error = true;
      this.flagInactive = false;
    }
  }

  onDelete() {
    if(this.extractControlsChanged.length > 0){
      this.warning = true;
      }
      else{
        this.popmessage="Please select at least on row"; 
        this.error = true;
        this.flagDelete = false;
      }
  }

  onDeleteConfirmation() {
    this.flagDelete = true;
    this.ServiceURL.DeleteExtControls(this.extractControlsChanged)
      .subscribe(
      (data: any) => {
        this.popmessage=data;      
        this.showDialog=true;
        this.getListOfExtractControls(this.selectedJobId , this.selectedProductId);
        this.warning = false;
        this.flagDelete = false;
      },
      (error) => {
        const errorData = error.json();
        this.popmessage=errorData.Message; 
        this.error = true;
        this.warning = false;
        this.flagDelete = false;
        console.log('error:', errorData.Message);
      });
  }
  onNo() {
    this.warning = false;
    this.flagInactive = false;
  }

  onCancel()
  {
    this.loadTable = false;
    this.propertyList = [];
    this.productList = [];
    this.jobList = [];
    this.extractControlsChanged = [];
  }
}
