import { Component, OnInit } from '@angular/core';
import { Data } from '../../../shared/data/data';
import { ERService } from '../../../shared/services/er-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  nodes = [];
  popmessage: string;
  success = false;
  error = false;
  dialog = false;
  save = false;
  ToggleButton = false;
  ToggleBack = false;
  showtree = false;
  ToggleCancel = false;
  message='';

  constructor(private data: Data, public ServiceURL: ERService, public router: Router) {
    this.bindTree(this.data.selectedproduct[0].ID, this.data.selectedproduct[0].PropertyID);
    if (this.data.viewProductSummary) {
      this.ToggleBack = true;
      this.ToggleButton = true;
    }
  }

  ngOnInit() {
  }

  bindTree(productid: number, propertyid: number) {
    this.showtree = true;
    
    this.ServiceURL.GetTreeView(productid, propertyid)
      .subscribe(
      (data: any[]) => {
        this.nodes = data;
        this.showtree = false;
        if (this.nodes.length == 0)
          {
            this.message='Nothing has been configured yet for :'+this.data.selectedproduct[0].Name ;
            this.ToggleButton = true;
          }
          
      },
      (error) => {

        const errorData = error.json();
        console.log('error:', errorData);
        this.showtree = false;
      }
      );
  }
  onBack() {
    this.router.navigate(['../product-step3']);

  }
  onCancel() {
    this.router.navigate(['../list-product']);
  }
  onCommit() {
    this.save = true;
    this.ServiceURL.GetProductCommited(this.data.selectedproduct[0].ID, this.data.selectedproduct[0].PropertyID)
      .subscribe(
      (data: any) => {
        this.save = false;
        this.dialog = true;
        this.data.selectedproduct = [];
        this.popmessage = data;
        this.success = true;
        this.ToggleButton = true;
        this.ToggleBack = true;
      },
      (error) => {
        console.log('error:', error);
        const errorData = error.json();
        this.dialog = true;
        this.popmessage = "Failed"
        this.success = false;
        console.log('error:', errorData);
        this.save = false;
      }
      );
  }
  Ok() {
    this.router.navigate(['../list-product']);
  }

}
