import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Job } from '../../../modal/job.modal';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';
import { OndemandJobData } from '../../../shared/data/ondemand-job-data';

@Component({
  selector: 'app-list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {
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
  filterJob = '';
  deleteJobId: number;
  warning = false;
  showDialog=false;
  error = false;
  popmessage='';

  constructor(public ServiceURL: ERService, public router: Router, private data: Data, private ondemandJobData : OndemandJobData) {
    this.ondemandJobData.Isback = null; 
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.getProductData();
    this.getJobData();

  }

  ngOnInit() {
  }

  onAddNewJob() {
    this.router.navigate(['../jobcreation']);
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
        // this.propertyList = data;
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
        // this.productList = data;
        this.product = data;
        this.showproduct = false;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproduct = false;

      });
  }

  getJobData(){
    this.ServiceURL.GetAllJobs()
      .subscribe(
      (data: Job[]) => {
        this.jobList = data;
        this.job = data;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
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
        this.jobList = this.job;
      }
      else {
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
       this.productList = [];
        this.jobList = this.job.filter(jobList => jobList.PropertyGroupName == this.pg[0].Name);
      }
    }
    this.showproperty = false;
  }
  onChangeProperty(id: number) {
    this.showproduct = true;
    if (this.product.length > 0) {
      if (id == 0) {
        this.productList = [];
        // this.productList = this.product.filter(productlist => productlist.PropertyGroupName == this.pg[0].Name);
        this.jobList = this.job.filter(jobList => jobList.PropertyGroupName == this.pg[0].Name);
      }
      else {
        this.pro = this.property;
        this.pro = this.pro.filter(proprtylist => proprtylist.ID == id);
        this.productList = this.product.filter(productlist => (productlist.PropertyID == id) && (productlist.PropertyGroupName == this.pg[0].Name));
        this.jobList = this.job.filter(jobList => (jobList.PropertyGroupName == this.pg[0].Name) &&  (jobList.PropertyId == id));
      }
    }
    this.showproduct = false;
  }
  onChangeProduct(id: number) {
    if (this.productList.length > 0) {
      if (id == 0) {
        this.jobList = this.job.filter(jobList => (jobList.PropertyGroupName == this.pg[0].Name) &&  (jobList.PropertyId == this.pro[0].ID));
      }
      else {
        this.jobList = this.job.filter(jobList => (jobList.PropertyGroupName == this.pg[0].Name) &&  (jobList.PropertyId == this.pro[0].ID) && (jobList.ProductId == id));
      }
    }
  }

  onJobEdit(sor) {
    this.data.EditJobPgId = sor.PropertyGroupId;
    this.data.EditJobPropertyId = sor.PropertyId;
    this.data.EditJobProductId = sor.ProductId;
    this.router.navigate(['../jobedit-step1']);
  }
  onView(sor){
    this.data.EditJobPgId = sor.PropertyGroupId;
    this.data.EditJobPropertyId = sor.PropertyId;
    this.data.EditJobProductId = sor.ProductId;
    this.data.EditJobId = sor.JobID;
    this.router.navigate(['../view-job']);
  }

  onJobDelete(sor: Job) {
    this.sor = sor;
    this.warning = true;
  }
  onDeleteConfirmation() {
    const jb = new Job();
    jb.PropertyId = this.sor.PropertyId;
    jb.ProductId = this.sor.ProductId;
    jb.JobID = this.sor.JobID;
    this.ServiceURL.DeleteJobOperation(jb)
      .subscribe(
      (data: any) => {
        this.popmessage=data;      
        this.showDialog=true;
        this.getJobData();
        this.warning = false;
      },
      (error) => {
        const errorData = error.json();
        this.popmessage=errorData.Message; 
        this.error = true;
        this.warning = false;
        console.log('error:', errorData.Message);
      });
  }
  onNo() {
    this.warning = false;
  }

}
