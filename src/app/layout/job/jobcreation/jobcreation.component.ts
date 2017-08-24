import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { PropertyGroup, Property, Product, Job } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-jobcreation',
  templateUrl: './jobcreation.component.html',
  styleUrls: ['./jobcreation.component.css']
})
export class JobcreationComponent implements OnInit {
  flagPropertyGroup: boolean;
  flagProperty: boolean;
  flagProduct: boolean;
  flagSave: boolean;
  flagJobExit: boolean;
  isDisable: boolean
  isChecked: boolean;
  pgList: PropertyGroup[];
  propertyList: Property[];
  productList: Product[];
  jobObject: Job;
  jobname: string;
  jobdesc: string;
  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.getActivePropertyGroup();

  }
  @ViewChild('propertygroupDD') propertygroupDD;
  @ViewChild('propertyDD') propertyDD;
  @ViewChild('productDD') productDD;
  @ViewChild('f') jobForm: NgForm;
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



  onPropertGroupDDChange(pgid: number) {
    this.flagProperty = true;
    this.productList = [];
    this.jobForm.form.controls['jobtext'].reset();
    this.jobForm.form.controls['jobd'].reset();
    this.isDisable=false;   
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
  onProductDDChange(productid: number) {
    this.jobForm.form.controls['jobtext'].reset();
    this.jobForm.form.controls['jobd'].reset();
    this.isDisable=false;   
    
    this.ServiceURL.GetJobForProduct(this.propertyDD.nativeElement.value, productid)
      .subscribe(
      (data: Job) => {

        if (data.JobID == 0) {
          this.isDisable = false;
        }
        else {
          this.isDisable = true;
          this.jobname = data.JobName;
          this.jobdesc = data.Description;
          this.isChecked = data.Active;
          this.flagJobExit = true;
          this.jobObject = data;
        }
        // this.router.navigate(["../job-step2"]);

      },
      (error) => {
        this.flagSave = false;
        console.log(error.json());
      }
      );

  }
  onPropertyDDChange(propertyid: number) {
    this.jobForm.form.controls['jobtext'].reset();
    this.jobForm.form.controls['jobd'].reset(); 
    this.isDisable=false;   
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
    if (this.flagJobExit) {
      this.data.selectedJob = this.jobObject;
      this.router.navigate(["../job-step2"]);
    }
    else {
      if (this.productDD.nativeElement.value != 0) {
        this.flagSave = true;
        let job = new Job();
        job.JobName = form.value.productname;
        job.Description = form.value.productdesc;
        job.ProductId = this.productDD.nativeElement.value;
        job.PropertyId = this.propertyDD.nativeElement.value;
        job.PropertyGroupId = this.propertygroupDD.nativeElement.value;
        job.Active = form.value.productActive;
        this.ServiceURL.AddJob(job)
          .subscribe(
          (data: Job) => {
            this.data.selectedJob = data;
            this.flagSave = false;
            //  console.log(data);
            this.router.navigate(["../job-step2"]);

          },
          (error) => {
            this.flagSave = false;
            console.log(error.json());
          }
          );
      }
    }
  }
}

