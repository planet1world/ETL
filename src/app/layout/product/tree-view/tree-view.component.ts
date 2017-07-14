import { Component, OnInit } from '@angular/core';
import { Data } from '../../../shared/data/data';
import { ERService } from '../../../shared/services/er-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
  nodes = [];
  // [{"id":1,"name":"saanvi","children":[{"id":2,"name":"FCSERT_TableMaster    (No of Selected Column:8 )","children":[{"id":3,"name":"ID","primarykey":true},{"id":4,"name":"Name","primarykey":false},{"id":5,"name":"CodeText","primarykey":false},{"id":6,"name":"SQLObjectID","primarykey":false},{"id":7,"name":"StatusID","primarykey":false},{"id":8,"name":"IsDeleted","primarykey":false},{"id":9,"name":"CreatedByID","primarykey":false},{"id":10,"name":"ModifiedByID","primarykey":false}]},{"id":12,"name":"FCSERT_ProductMaster    (No of Selected Column:7 )","children":[{"id":13,"name":"ID","primarykey":true},{"id":14,"name":"Name","primarykey":false},{"id":15,"name":"CodeText","primarykey":false},{"id":16,"name":"StatusID","primarykey":false},{"id":17,"name":"IsDeleted","primarykey":false},{"id":18,"name":"CreatedByID","primarykey":false},{"id":19,"name":"ModifiedByID","primarykey":false}]},{"id":21,"name":"FCSERT_ProductTableMapping    (No of Selected Column:4 )","children":[{"id":22,"name":"ID","primarykey":false},{"id":23,"name":"ProductMasterID","primarykey":true},{"id":24,"name":"TableMasterID","primarykey":true},{"id":25,"name":"PrimaryKeyMasterID","primarykey":false}]},{"id":27,"name":"FCSERT_PrimaryKeyMaster    (No of Selected Column:6 )","children":[{"id":28,"name":"ID","primarykey":true},{"id":29,"name":"Name","primarykey":false},{"id":30,"name":"TableMasterID","primarykey":false},{"id":31,"name":"TableMasterName","primarykey":false},{"id":32,"name":"ColumnMasterID","primarykey":false},{"id":33,"name":"ColumnMasterName","primarykey":false}]},{"id":35,"name":"FCSERT_ColumnMaster    (No of Selected Column:8 )","children":[{"id":36,"name":"ID","primarykey":true},{"id":37,"name":"Name","primarykey":false},{"id":38,"name":"DataType","primarykey":false},{"id":39,"name":"MaxSize","primarykey":false},{"id":40,"name":"TableMasterID","primarykey":false},{"id":41,"name":"TableMasterName","primarykey":false},{"id":42,"name":"StatusID","primarykey":false},{"id":43,"name":"IsDeleted","primarykey":false}]}],"isExpanded":true}];
  popmessage: string;
  success = false;
  error = false;
  dialog = false;
  save = false;
  ToggleButton=false;
  showtree=false;

  constructor(private data: Data, public ServiceURL: ERService, public router: Router) {
    this.bindTree(this.data.selectedproduct[0].ID, this.data.selectedproduct[0].PropertyID);
  }

  ngOnInit() {
  }

  bindTree(productid: number, propertyid: number) {
    this.showtree=true;
    this.ServiceURL.GetTreeView(productid, propertyid)
      .subscribe(
      (data: any[]) => {
        this.nodes = data;
        this.showtree=false;

      },
      (error) => {

        const errorData = error.json();
        console.log('error:', errorData);
        this.showtree=false;
      }
      );
  }
  onBack() {
    this.router.navigate(['../product-step3']);

  }
  onCommit() {
    this.save = true;
    this.ServiceURL.GetProductCommited(this.data.selectedproduct[0].ID, this.data.selectedproduct[0].PropertyID)
      .subscribe(
      (data: any) => {
        this.save = false;
        this.dialog = true;
        console.log(data);
        this.popmessage = data;
        this.success = true;
        this.ToggleButton=true;
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

}
