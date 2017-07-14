import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  propertygroup: PropertyGroup[];
  property: Property[];
  propertyList: Property[];
  isActive: number;
  showpropertygroup = false;
  showproperty = false;
  textareaLength = 30;
  selpropertyGroup = 0;
  selectProperyName = '';
  save=false;
  constructor(public ServiceURL: ERService, public router: Router) {
    this.getActivePropertyGroup();
    this.getPropertyData();
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
        let selectpush = new PropertyGroup();
        selectpush.ID = 0;
        selectpush.Name = 'Select Property Group';
        this.propertygroup.push(selectpush);
        // this.selpropertyGroup = 0;
        this.showpropertygroup = false;
      },
      (error) => {

        const errorData = error.json();
        console.log('error:', errorData);
        this.showpropertygroup = false;

      });


  }
  onProductCreation() {

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
}
