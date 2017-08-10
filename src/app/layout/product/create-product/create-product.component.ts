import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  propertygroup: PropertyGroup[];
  property: Property[];
  propertyList: Property[];
  isActive: number;
  showpropertygroup = false;
  showproperty = false;
  error = false;
  popmessage: string;
  save = false;
  textareaLength = 30;
  selpropertyGroup = 0;
  selectProperyName: string;
  alerts=[];
  validation=false;
  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.data.viewProductSummary=false;
   
  }
  @ViewChild('selectPG') selectPG;
  @ViewChild('selectProperty') selectProperty;

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
        this.propertyList = data;
        this.property = data;
        this.showproperty = false;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproperty = false;

      });
  }

  onChangePG(id: number) {
    if (this.property.length > 0) {
      if (id == 0)
        this.propertyList = this.property;
      else
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
    }
  }
  logCheckbox(element: HTMLInputElement) {
    if (element.checked)
      this.isActive = 1;
    else
      this.isActive = 0;
  }

  _keyPress(event: any) {
    const pattern = /[a-zA-Z0-9 ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onProductCreation() {
    if (this.Isvaladiate()) {
     this.save = true;
      const obj = new Product();
      obj.PropertyID = this.selectProperty.nativeElement.value;
      obj.Name = this.selectProperyName;
      obj.Active = this.isActive;
      obj.Operation = 'InsertRecord';
      this.ServiceURL.PostProductOperation(obj)
        .subscribe
        (
        (data: Product[]) => {
          this.save = false;          
          this.data.selectedproduct = data;         
          this.router.navigate(['../product-step2']);

        },
        (error) => {
          const errorData = error.json();
          this.save = false;
          this.error = true;
          this.popmessage = errorData.Message;

        });
    }
    else {
      this.validation=true;     
    
    }

  }
  onSaveAndCancle()
  {
    if (this.Isvaladiate()) {
     this.save = true;
      const obj = new Product();
      obj.PropertyID = this.selectProperty.nativeElement.value;
      obj.Name = this.selectProperyName;
      obj.Active = this.isActive;
      obj.Operation = 'InsertRecord';
      this.ServiceURL.PostProductOperation(obj)
        .subscribe
        (
        (data: Product[]) => {
          this.save = false;          
          this.data.selectedproduct = [];         
          this.router.navigate(['../list-product']);

        },
        (error) => {
          const errorData = error.json();
          this.save = false;
          this.error = true;
          this.popmessage = errorData.Message;

        });
    }
    else {
      this.validation=true;     
    
    }

  }
  onCancle()
  {
   this.router.navigate(['../list-product']);
  }
  Isvaladiate():boolean {
      this.alerts = [];
      let val=true;
    if (this.selectProperty.nativeElement.value == 0)
    {   this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Please Select Property',
      });
      val=false;
    }
    if (this.selectProperyName == '' || this.selectProperyName == undefined)
    {
        this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Please Fill Product Name',
      });
       val=false;
     }
    if (this.selectPG.nativeElement.value == 0)
    {
        this.alerts.push({
        id: 3,
        type: 'danger',
        message: 'Please Select Property Group',
      });
       val=false;
     }

     return val;
  }
}
