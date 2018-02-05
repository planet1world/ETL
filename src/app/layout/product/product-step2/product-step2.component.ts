import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Product, Template, DropDownClass, ProductTableList, ProductTable } from '../../../modal/product.modal';
import { Data } from '../../../shared/data/data';
import { ERService } from '../../../shared/services/er-service.service';

@Component({

    selector: 'app-product-step2',
    templateUrl: './product-step2.component.html',
    styleUrls: ['./product-step2.component.scss']
})
export class ProductStep2Component implements OnInit {
    productname: Product[];
    // tableList: ProductTableList[];
    template = [];
    productlist: DropDownClass[];
    schemalist: DropDownClass[];
    tableList: Array<any> = [];
    propertygroup: Array<any> = [];
    temp = [];
    count: number;
    showtemplate = false;
    showproperty = false;
    showschema = false;
    save = false;
    error = false;
    conString: string;
    filterSource = '';
    popmessage = '';
    validation = false;
    alerts = [];
    isEdit = false;
    pagename = '';

    name: string;
    constructor(private data: Data, public router: Router, public ServiceURL: ERService) {
        this.count = 0;
        this.productname = this.data.selectedproduct;
        this.name = this.productname[0].Name;
        this.isEdit = this.data.EditProduct ;
        this.pagename = this.data.EditProduct == true ? 'Edit Product' : 'Create Product';
        this.getTemplate();
        this.getSchema();

    }
    @ViewChild('selectlist') selectlist; @ViewChild('selectschema') selectschema;
    ngOnInit() {
    }
    logCheckbox(element: HTMLInputElement, tablename: string) {
        if (element.checked) {
            this.count = this.count + 1;
            // this.temp.push({
            //     Name: tablename,
            // }
            // );
        }
        else {
            if (this.count > 0)
                this.count = this.count - 1;
            // this.temp = this.temp.filter(item => item.Name !== tablename);
        }


    }

    checkAll(ev) {
        console.log(ev);
       
        if (ev.target.checked) {
            console.log("1...");
            this.tableList.forEach(x => x.type = ev.target.checked)
            this.count = this.tableList.length;
            // for (let d of this.tableList)
            //     this.temp.push({
            //         Name: d.Name,
            //     }
            //     );
        }
        else {
            console.log("2...");
            this.tableList.forEach(x => x.type = x.Disable) 
            this.count = this.tableList.filter(x=>x.type==true).length;
            // this.temp = [];
        }
        console.log("this.tableList: " + JSON.stringify(this.tableList));
        
    }

    isAllChecked() {
        // console.log('fired');
        return this.tableList.every(_ => _.type);
    }


    getTemplate() {
        this.showtemplate = true;
        this.ServiceURL.getTemplateList()
            .subscribe(
            (data: any[]) => {

                this.template = [];
                for (let d of data) {
                    this.template.push({
                        ID: d.ID,
                        Name: d.Name,
                        Con: d.Connectionstring
                    });
                }
                this.showtemplate = false;

            },
            (error) => {
                const errorData = error.json();
                console.log('error:', errorData);
                this.showschema = false;
            }
            );
    }
    getSchema() {
        this.showschema = true;
        this.ServiceURL.getProductSchema()
            .subscribe(
            (data: DropDownClass[]) => {
                this.schemalist = data;
                this.showschema = false;
            },
            (error) => {
                const errorData = error.json();
                console.log('error:', errorData);
                this.showschema = false;
            }
            );
    }
    onChangeDB(connectionstring: string) {
        this.showproperty = true;
        this.tableList = [];
        this.temp = [];
        this.conString = connectionstring;
        let obj = new Template();
        obj.Connectionstring = connectionstring;
        this.ServiceURL.getTemplateProductlist(obj)
            .subscribe(
            (data: DropDownClass[]) => {
                this.productlist = data;
                this.showproperty = false;
            },
            (error) => {
                const errorData = error.json();
                console.log('error:', errorData);
                this.showproperty = false;
            }
            );
    }

    onChangeProductList(id: number) {
        this.tableList = [];
        this.temp = [];
        this.showproperty = true;
        let obj = new Template();
        obj.Connectionstring = this.conString;
        obj.ProductMasterID = this.selectlist.nativeElement.value;
        obj.TableMasterID = this.productname[0].ID;//passing productid to TableMasterID
        obj.PrimaryKeyMasterID = this.selectschema.nativeElement.value;//passing schemaid to PrimaryKeyMasterID
        this.count = 0;
        this.ServiceURL.getTemplateTableList(obj)
            .subscribe(
            (data: ProductTableList[]) => {
                console.log("tbllist : " + JSON.stringify(data));
                for (let d of data) {
                    this.tableList.push({
                        ID: d.ID,
                        type: d.type,
                        Name: d.Name,
                        Disable: d.type
                    });
                    if (d.type == true) {
                        this.count = this.count + 1;
                    }

                }
                
                this.showproperty = false;
            },
            (error) => {
                const errorData = error.json();
                console.log('error:', errorData);
                this.showproperty = false;
            }
            );

    }

    onCancle() {
        this.data.selectedproduct = [];
        this.router.navigate(['../list-product']);
    }

    onSaveTable() {
        this.alerts = [];
        if (this.count < 1) {
            this.alerts.push({
                id: 1,
                type: 'danger',
                message: 'Please Select at least one table',
            });
            this.validation = true;
        }
        else if (this.selectschema.nativeElement.value == 0) {
            this.alerts.push({
                id: 1,
                type: 'danger',
                message: 'Please Select Schema',
            });
            this.validation = true;
        }
        else {
            this.save = true;
            let tablename = [];
            // for (let name of this.temp) {
            //     let obj = new ProductTable();
            //     obj.Name = name.Name;
            //     obj.DestinationDBSchemaID = this.selectschema.nativeElement.value;
            //     obj.statusID = 3;
            //     obj.RequestInfo = 'AddTable';
            //     obj.PrimaryKey = '';
            //     obj.PropertyID = 0;
            //     obj.ProductID = this.productname[0].ID;
            //     obj.ID = 0;
            //     tablename.push(obj);
            // }

            for (let name of this.tableList) {
                let obj = new ProductTable();
                obj.Name = name.Name;
                obj.DestinationDBSchemaID = this.selectschema.nativeElement.value;
                obj.statusID = 3;
                if (name.type == true) {
                    obj.RequestInfo = 'AddTable';
                    this.temp.push({
                        Name: name.Name,
                    }
                    );

                }
                else {
                    obj.RequestInfo = 'RemoveTableForProduct';
                }

                obj.PrimaryKey = '';
                obj.PropertyID = 0;
                obj.ProductID = this.productname[0].ID;
                obj.ID = 0;
                tablename.push(obj);
            }

            this.ServiceURL.processProductTable(tablename)
                .subscribe(
                (data: any) => {
                    this.save = false;
                    this.data.selectedtablelist = this.temp;
                    this.data.SchemaId = this.selectschema.nativeElement.value;
                    this.data.templateconnectionstring = this.conString;
                    this.router.navigate(['../product-step3']);
                },
                (error) => {
                    const errorData = error.json();
                    console.log('error:', errorData);
                    this.save = false;
                }
                );
        }
    }

}
