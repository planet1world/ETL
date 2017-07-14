import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { Product } from '../../../modal/product.modal';
import { ERService } from '../../../shared/services/er-service.service';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  propertygroup: PropertyGroup[];
  propertyList: Property[];
    property: Property[];
    productlist:Product[];
    product:Product[];
    filterSource='';
  showpropertygroup = false;
  showproperty=false;
  constructor(public ServiceURL: ERService, public router: Router,private data: Data) {
    this.getActivePropertyGroup();
    this.getPropertyData();
    this.getProductData();

  }

  ngOnInit() {
  }
  onAddNewProduct() {
    this.router.navigate(['../create-product']);
  }
  onPGEdit(sor){  
    let plst: Product[]=[]; 
     plst.push(sor);
     this.data.selectedproduct = plst;  
     this.data.EditProduct=true;  
    this.router.navigate(['../product-step2']);
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

  getProductData(){
    const pro=new Product();
    pro.Operation='GetAllProduct';
    this.ServiceURL.PostProductOperation(pro)
      .subscribe(
      (data: Product[]) => {
        this.productlist = data;
        this.product = data;
        this.showproperty = false;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showproperty = false;

      });
  }
   onChangePG(id: number) 
   {
      if (this.property.length > 0) {
      if (id == 0)
        this.propertyList = this.property;
      else
        this.propertyList = this.property.filter(propertyList => propertyList.PropertyGroupID == id);
    }
   }
   onChangeProperty(id: number)
   {
      if (this.product.length > 0) {
      if (id == 0)
        this.productlist = this.product;
      else
        this.productlist = this.product.filter(productlist => productlist.PropertyID == id);
    }
   }
}
