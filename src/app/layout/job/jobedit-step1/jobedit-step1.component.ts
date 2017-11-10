import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { PropertyGroup, Property, Product, Job } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-jobedit-step1',
  templateUrl: './jobedit-step1.component.html',
  styleUrls: ['./jobedit-step1.component.css']
})
export class JobeditStep1Component implements OnInit {
  flagPropertyGroup: boolean;
  flagProperty: boolean;
  flagProduct: boolean;
  flagJobExit: boolean;
  isDisable = true;
  isNext = true;
  isChecked: boolean;
  status : boolean;
  pgList: PropertyGroup[];
  propertyList: Property[];
  productList: Product[];
  jobObject: Job;
  jobname: string;
  jobdesc: string;
  selectPgId : number;
  selectPropertyId : number;
  selectProductId : number;
  jobid : number;
  

  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.getActivePropertyGroup();
    this.selectPgId = this.data.EditJobPgId;
    this.getProperties(this.selectPgId);
    this.selectPropertyId = this.data.EditJobPropertyId;
    this.getProducts(this.selectPropertyId);
    this.selectProductId = this.data.EditJobProductId;
    this.getJobDetails(this.selectProductId, this.selectPropertyId);
  }


  @ViewChild('propertygroupDD') propertygroupDD;
  @ViewChild('propertyDD') propertyDD;
  @ViewChild('productDD') productDD;
  ngOnInit() {
  }

  getActivePropertyGroup() {
    const obj = new PropertyGroup();
    obj.Operation = 'GetRecordsByStatus';
    obj.Active = 1;
    this.flagPropertyGroup = true;
    this.ServiceURL.CreatePropertyGroup(obj)
      .subscribe(
      (data: PropertyGroup[]) => {
        this.pgList = data;
        this.flagPropertyGroup = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.flagPropertyGroup = false;
      });
  }

  getProperties(pgid: number) {
    this.flagProperty = true;
    this.ServiceURL.GetPropertyList(pgid)
      .subscribe(
      (data: Property[]) => {
        this.propertyList = data;
        this.flagProperty = false;
      },
      (error) => {
        console.log(error.json());
        this.flagProperty = false;
      }
      );
  }

  getJobDetails(productid: number, propertyid: number) {
    
    this.ServiceURL.GetJobForProduct(propertyid, productid)
      .subscribe(
      (data: Job) => {
        this.data.selectedJob = data;
          this.jobid = data.JobID;
          this.data.EditJobId = data.JobID;
          this.jobname = data.JobName;
          this.jobdesc = data.Description;
          this.isChecked = data.Active;
          this.status = data.Active;
          this.jobObject = data;
          this.isNext = false;
      },
      (error) => {
        console.log(error.json());
      }
      );
  }

  getProducts(propertyid: number) {  
    let obj = new Product();
    obj.PropertyID = propertyid;
    obj.Operation = "GetProducsforProperty";
    this.flagProduct = true;
    this.ServiceURL.PostProductOperation(obj)
      .subscribe(
      (data: Product[]) => {
        this.productList = data;
        this.flagProduct = false;
      },
      (error) => {
        console.log(error.json());
        this.flagProduct = false;
      }
      );
  }
  
  onJobFormSubmit(form: NgForm) {
    if (this.isChecked != this.status) {
      let job = new Job();
      job.JobID = this.jobid;
      job.Active = form.value.productActive;
      this.ServiceURL.UpdateJobStatus(job)
        .subscribe(
        (data) => {
          console.log('if' +data);
          this.router.navigate(["../jobedit-step2"]);

        },
        (error) => {
          console.log(error.json());
        }
        );
    }
    else{
      console.log('else');
      this.router.navigate(["../jobedit-step2"]);
    }
  }
  
  onCancel(){
    this.router.navigate(["../list-job"]);
  }
}


