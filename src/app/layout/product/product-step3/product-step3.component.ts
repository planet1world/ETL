import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product, ProductTableStructure, Template, DropDownClass, ProductTableList, ProductTable, CheckBox, TableColumn } from '../../../modal/product.modal';
import { Data } from '../../../shared/data/data';
import { ERService } from '../../../shared/services/er-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-step3',
  templateUrl: './product-step3.component.html',
  styleUrls: ['./product-step3.component.scss']
})
export class ProductStep3Component implements OnInit {
  productname: Product[];
  name: string;
  table: any[];
  alert: Array<any> = [];
  draftTable: Array<string> = [];
  allreadyselectedtable: Array<string> = [];
  primarykey: CheckBox[];
  tableCol: TableColumn[];
  selectedtableCol: TableColumn[] = [];
  temp: TableColumn[] = [];
  selectedtemp: TableColumn[] = [];
  alerts = [];
  validation = false;
  error = false;
  popmessage = '';
  filterSource = '';
  showprimarykey = false;
  showavailablecolumn = false;
  showselectedcolumn = false;
  ToggleButton = true;
  ToggleBack = true;
  ToggleNext = false;
  savedraft = false;
  save = false;
  showtable = false;
  auto = false;
  tabelname: string;
  tablemaxcount: number;
  selectedtable: string;
  count: number = -1;
  constructor(private data: Data, public ServiceURL: ERService, public router: Router) {
    this.productname = this.data.selectedproduct;
    this.name = this.productname[0].Name;
    this.table = this.data.selectedtablelist;
    this.tablemaxcount = this.table.length;

  }
  @ViewChild('selectlist') selectable;
  ngOnInit() {
  }
  onBack() {

    this.ToggleNext = false;
    this.count = this.count - 1;
    if (this.count <= 0) {
      console.log('onBack Count:', this.count);
      this.ToggleBack = true;
      this.count = 0;
    }
    this.selectedtable = this.table[this.count].Name;
    this.onChangeTable(this.selectedtable);
  }
  onNext() {
    console.log(this.tablemaxcount, ':table count');
    this.ToggleBack = false;
    this.count = this.count + 1;
    if (this.count >= this.tablemaxcount - 1) {
      console.log('onNext count:', this.count);
      this.ToggleNext = true;
      this.count = this.tablemaxcount - 1;
    }
    this.selectedtable = this.table[this.count].Name;
    this.onChangeTable(this.selectedtable);

  }
  onBackPage() {
    this.router.navigate(['../product-step2']);
  }
  public closeAlert(alert: any) {
    const index: number = this.alert.indexOf(alert);
    this.alert.splice(index, 1);
  }
  onAuto() {
    this.auto = true;
    this.ServiceURL.AutoSelectforTable(this.data.templateconnectionstring, this.data.selectedtablelist, String(this.data.selectedproduct[0].ID),
      String(this.data.selectedproduct[0].PropertyID), String(this.data.SchemaId))
      .subscribe(
      (data: any) => {
        for (let d of this.data.selectedtablelist) {
          if (this.draftTable.some(x => x === this.tabelname)) {

          }
          else {
            this.draftTable.push(d);
          }
        }

        // this.auto = false;
        // this.alert = [];
        // this.alert.push({
        //   id: 1,
        //   type: 'success',
        //   message: "All table are selected ",
        // });
        this.router.navigate(['../tree-view']);


      },
      (error) => {
        console.log('error:', error);
        const errorData = error.json();
        console.log('error:', errorData);
        this.auto = false;
        this.alert = [];
        this.alert.push({
          id: 1,
          type: 'danger',
          message: "Opps!! some thing gone wrong.",
        });

      }

      );
  }


  onChangeTable(tabelname: string) {
    this.temp = [];
    this.tableCol = [];
    this.selectedtableCol = [];
    this.tabelname = tabelname;
    this.ToggleButton = false;
    this.count = this.table.findIndex(item => item.Name === tabelname);
    if (this.count == 0) {
      this.ToggleBack = true;
      this.ToggleNext = false;

    }
    else if (this.count == this.tablemaxcount - 1) {
      this.ToggleNext = true;
      this.ToggleBack = false;

    }

    this.fetchPrimaryKey(this.data.templateconnectionstring, tabelname);
    this.fetchColumnfromTemplate(this.data.templateconnectionstring, tabelname);
  }

  fetchPrimaryKey(connectionstring: string, tablename: string) {
    this.showprimarykey = true;
    this.ServiceURL.GetPrimaryKeyforTable(connectionstring, tablename, String(this.productname[0].ID), String(this.data.SchemaId))
      .subscribe(
      (data: CheckBox[]) => {
        this.primarykey = data;
        this.showprimarykey = false;
        for (let d of this.primarykey) {
          if (d.Selected == true) {
            // console.log(this.allreadyselectedtable);
            if (this.allreadyselectedtable.some(x => x == tablename)) {

            }
            else {
              this.allreadyselectedtable.push(tablename);
            }
          }
        }
        // }
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showprimarykey = false;

      }
      );

  }
  fetchPrimaryKeyfromMetaDta(p: Product, tablename: string) {

  }
  fetchColumnfromTemplate(connectionstring: string, tablename: string) {
    this.showavailablecolumn = true;
    this.showselectedcolumn = true;
    this.ServiceURL.TGetColumnforTable(connectionstring, tablename, String(this.productname[0].ID), String(this.data.SchemaId))
      .subscribe(
      (data: TableColumn[]) => {
        this.tableCol = data.filter(item => item.Disable !== true);
        this.selectedtableCol = data.filter(item => item.Disable == true);
        this.showavailablecolumn = false;
        this.showselectedcolumn = false;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showavailablecolumn = false;
        this.showselectedcolumn = false
      }
      );
  }
  fetchColumnfromMetaDta(p: Product, tablename: string) {

  }
  onChkAvlColumn(element: HTMLInputElement, column: TableColumn) {

    // if (element.checked) {
    //   this.temp.push(column);
    // } else {
    //   this.temp = this.temp.filter(item => item.Name !== column.Name);

    // }

  }
  onChkSelColumn(element: HTMLInputElement, column: TableColumn) {
    // if (element.checked) {
    //   this.selectedtemp.push(column);
    // } else {
    //   this.selectedtemp = this.selectedtemp.filter(item => item.Name !== column.Name);

    // }
  }

  onPushRight() {
    for (let d of this.tableCol) {
      if (d.Selected == true) {
        this.selectedtableCol.push(d);
        this.tableCol = this.tableCol.filter(item => item.Name !== d.Name);
      }

    }

  }
  onPushAllRight() {
    for (let d of this.tableCol) {
      this.selectedtableCol.push(d);
      this.tableCol = this.tableCol.filter(item => item.Name !== d.Name);

    }
  }
  onPushAllLeft() {
    for (let d of this.selectedtableCol) {
      if (d.Disable != true) {
        // d.Selected=false;
        this.tableCol.push(d);
        this.selectedtableCol = this.selectedtableCol.filter(item => item.Name !== d.Name);

      }
    }

  }
  onPushLeft() {
    for (let d of this.selectedtableCol) {
      if (d.Selected == true) {
        // d.Selected=false;
        this.tableCol.push(d);
        this.selectedtableCol = this.selectedtableCol.filter(item => item.Name !== d.Name);

      }
      else {
        // this.selectedtableCol = this.selectedtableCol.filter(item => item.Name !== d.Name);
      }
    }

  }
  onSaveDraft() {
    this.alerts = [];
    let countPK = 0;
    let countColn = 0;
    let isColumnSelected=this.selectedtableCol.length>0?true:false;

    for (let d of this.primarykey) {
      console.log(this.primarykey);
      if (d.Selected == true) {      
        countPK = countPK + 1;
      }
    }


    if (countPK > 0) {
      if (isColumnSelected) {
        let primaryKeyinSelectedColumn=this.primarykey.filter(i=>i.Selected==true);
        countPK=0;
        console.log('primrykey',primaryKeyinSelectedColumn);
        for (let p of primaryKeyinSelectedColumn) {
          let istrue=this.selectedtableCol.find(i=>i.Name==p.Name)===undefined?false:true;
          console.log(this.selectedtableCol.find(i=>i.Name==p.Name));
          if (istrue) {      
            countPK = countPK + 1;
          }
        }
         if(countPK==primaryKeyinSelectedColumn.length)
          {
        let t = this.tabelname;
        if (this.draftTable.some(x => x === this.tabelname)) {

        }
        else {
          this.draftTable.push(t);
        }
        console.log(this.draftTable);
        let obj = new ProductTableStructure();
        obj.TableName = this.tabelname;
        obj.ProductID = this.productname[0].ID;
        obj.PrimarkyKey = this.primarykey.filter(item => item.Selected == true);
        obj.SelectedColumn = this.selectedtableCol;
        obj.DeletedColumn = this.tableCol;
        obj.StatusId = 3;
        obj.PropertyID = this.productname[0].PropertyID;
        obj.SchemaId = this.data.SchemaId;
        this.savedraft = true;
        this.ServiceURL.PostProductStep3(obj)
          .subscribe(
          (data: any) => {

            this.savedraft = false;
            this.ToggleButton = true;

          },
          (error) => {
            const errorData = error.json();
            console.log('error:', errorData);
            this.savedraft = false;

          }

          );
        }
        else{

          this.alerts.push({
            id: 3,
            type: 'danger',
            message: 'Selected Primary Key is Not Avilable in Column',
          });
          this.validation = true;
          console.log('Select at least one coloumn')
        }

      }
      else {
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Select at least one coloumn',
        });
        this.validation = true;
        console.log('Select at least one coloumn')
      }

    }
    else {
      this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Select at least one primary key',
      });
      this.validation = true;
      console.log('select at least on primary key')
    }
  }

  onNextTable() {
    let finalarray = this.arrayUnique(this.draftTable, this.allreadyselectedtable);
    // console.log(JSON.stringify(finalarray));
    // console.log(JSON.stringify(this.draftTable));
    // console.log(JSON.stringify(this.allreadyselectedtable));
    if (finalarray.length == this.data.selectedtablelist.length) {
      this.router.navigate(['../tree-view']);
    }
    else {

      this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Configure all Table to move next screen',
      });
      this.validation = true;
    }

  }

  arrayUnique(array1, array2) {
    // var a = array.concat();
    // for (var i = 0; i < a.length; ++i) {
    //   for (var j = i + 1; j < a.length; ++j) {
    //     if (a[i] === a[j])
    //       a.splice(j--, 1);
    //   }
    // }

    // return a;
    let newArray = array1.concat(array2).sort(function (a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    });

    return newArray.filter(function (item, index) {
      return newArray.indexOf(item) === index;
    });
  }


}
