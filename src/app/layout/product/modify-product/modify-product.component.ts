import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.scss']
})
export class ModifyProductComponent implements OnInit {
  propertygroup: PropertyGroup[];
  property: Property[];
  propertyList: Property[];
  isActive: number = 0;
  showPropertyGroup = '';
  showProperty = '';
  textareaLength = 30;
  selpropertyGroup = 0;
  selectPropertyName = '';
  save = false;
  isChecked = false;
  success = false;
  error = false;
  popmessage = '';
  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.showPropertyGroup = this.data.selectedproduct[0].PropertyGroupName;
    this.showProperty = this.data.selectedproduct[0].PropertyName;
    this.selectPropertyName = this.data.selectedproduct[0].Name;
    this.isChecked = this.data.selectedproduct[0].Active == 1 ? true : false;
    this.isActive = this.data.selectedproduct[0].Active;
  }

  ngOnInit() {
  }

  logCheckbox(element: HTMLInputElement) {
    if (element.checked)
      this.isActive = 1;
    else
      this.isActive = 0;
  }
  onEditSave() {
    this.save = true;
    if (this.selectPropertyName != '') {
      const obj = new Product();
      obj.ID = this.data.selectedproduct[0].ID;
      obj.Name = this.selectPropertyName;
      obj.Active = this.isActive;
      obj.Operation = 'UpdateRecord';
      this.ServiceURL.PostProductOperation(obj)
        .subscribe
        (
        (data: any) => {
          this.save = false;
          this.data.selectedproduct[0].Name = this.selectPropertyName;
          this.success = true;
          this.popmessage = data;
          // this.router.navigate(['../list-product']);

        },
        (error) => {
          const errorData = error.json();
          // console.log(errorData);
          this.save = false;
          this.error = true;
          this.popmessage = errorData.Message;
        });

    }


  }
  onCancle() {
    this.data.selectedproduct = [];
    this.router.navigate(['../list-product']);

  }
  onViewSummary() {
    this.data.viewProductSummary = true;
    this.data.EditProduct = true;
    this.router.navigate(['../tree-view']);

  }
  onAddTable() {
    this.data.viewProductSummary = false;
    this.data.EditProduct = true;
    this.router.navigate(['../product-step2']);

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
