import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from '../../modal/customerid-modal.modal';
import { PropertyGroup, Property } from '../../modal/propertygroup-modal.modal';
import { TimeZone } from '../../modal/timezone-modal.modal';
import { ERService } from '../../shared/services/er-service.service';
import { Accordion, AccordionGroup } from '../../accordion';
import { OndemandJobData } from '../../shared/data/ondemand-job-data';

@Component({
  selector: 'app-property-manager',
  templateUrl: './property-manager.component.html',
  styleUrls: ['./property-manager.component.scss'],

})
export class PropertyManagerComponent implements OnInit {
  showPG = false;
  showProperty = false;
  pgnameModal: string;
  selectProperyName: string;
  customerArray: Customer[];
  isActive: number;
  selectedOperation: number;
  selectedTimezone: number;
  textareaLength = 30;
  popmessage: string;
  connection: string;
  header: string;
  error = false;
  success = false;
  warning = false;
  validation = false;
  isUpdate = false;
  isDelete = false;
  productId: number;
  operationno: number;// 1 for propertyGroup and 2 for property
  ddCid = 1;//postion selection on dd of customerid
  ddP = 1;  //postion selection on dd of property group
  propertGroupList: PropertyGroup[];
  timezoneList: TimeZone[];
  propertyGroupListforPorperty: PropertyGroup[];
  propertyList: Property[];
  filterproperty: Property[];
  save = false;// for spinner
  PGactive = false;
  Pactive = false;
  alerts = [];
  pgdisabled = false;
  propertynamedisabled = false;
  checkboxdisabled = false;
  timezonedisabled = false;
  customerdisabled = false;
  pgnamedisabled = false;
  pgtimedisabled = false;
  pgcheckboxdisabled = false;
  showPropertyButton = false;
  showPGButton = false;
  specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  constructor(public ServiceURL: ERService, public router: Router, private ondemandJobData : OndemandJobData) { 
    this.ondemandJobData.Isback = null;
  }
  @ViewChild('selectCustomer') selectCustomer;
  @ViewChild('selectPG') selectPG;
  @ViewChild('selectTime') selectTime;
  @ViewChild('selectTimePG') selectTimePG;
 
  ngOnInit() {
    this.getCustomer();
    this.getPropertyGroupData();
    this.getPropertyData();
    this.getTimezoneList();
    this.getActivePropertyGroup();
  }
  onAddNewPG() {
    this.customerdisabled = false;
    this.pgnamedisabled = false;
    this.pgtimedisabled = false;
    this.pgcheckboxdisabled = false;
    this.showPGButton = true;
    this.showPG = true;
    this.PGactive = false;
    this.pgnameModal = '';
    this.header = 'Add New Property Group';
  }
  onPropertyGroupCancel() {
    this.showPG = false;
  }



  checkForSpecialChar(value: string): boolean {
    for (let i = 0; i < this.specialChars.length; i++) {
      if (value.indexOf(this.specialChars[i]) > -1) {
        return true
      }
    }
    return false;
  }

  onAddProperty() {
    this.header = 'Add New Property';
    this.getActivePropertyGroup();
    this.Pactive = false;
    this.selectProperyName = '';
    this.showProperty = true;
    this.isActive = 0;
    this.productId = 0;
    this.showPropertyButton = true;
    this.pgdisabled = false;
    this.propertynamedisabled = false;
    this.checkboxdisabled = false;
    this.timezonedisabled = false;
    this.showPropertyButton = true;

  }
  onPropertyCancel() {
    this.showProperty = false;
  }

  onNo() {
    this.warning = false;
  }

  _keyPress(event: any) {
    const pattern = /[a-zA-Z0-9 ]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  onConfirmPropertyDelete() {
    const obj = new Property();
    obj.Name = this.selectProperyName;
    obj.PropertyGroupID = this.selectPG.nativeElement.value;
    obj.TimeZone = this.selectTime.nativeElement.value;
    obj.Active = this.isActive;
    obj.ID = this.productId;
    obj.Operation = 'DeleteRecord';
    this.ServiceURL.PropertyOperation(obj)
      .subscribe(
      (data: any) => {
        this.save = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.showProperty = false;
        this.success = true;
        this.popmessage = data;
        this.getPropertyData();

      },
      (error) => {
        this.save = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.showProperty = false;
        const errorData = error.json();
        this.error = true;
        this.popmessage = errorData.Message;
        console.log('error:', errorData);

      });

  }
  onPropertyDataSave() {
    if (this.selectProperyName == '' || this.selectProperyName == undefined) {
      this.alerts = [];

      this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Please Fill Property Name',
      });
      this.validation = true;
    }
    else {

      if (this.checkForSpecialChar(this.selectProperyName)) {
        this.alerts = [];

        this.alerts.push({
          id: 1,
          type: 'danger',
          message: 'Special characters like !@#$%^&*.,<>/\'";:? Not allowed',
        });
        this.validation = true;
      }

      else {
        this.save = true;


        const obj = new Property();
        obj.Name = this.selectProperyName;
        obj.PropertyGroupID = this.selectPG.nativeElement.value;
        obj.TimeZone = this.selectTime.nativeElement.value;
        obj.Active = this.isActive;
        obj.ID = this.productId;


        if (this.isUpdate) {
          obj.Operation = 'UpdateRecord';

        }
        else {
          obj.Operation = 'InsertRecord';
        }
        this.ServiceURL.PropertyOperation(obj)
          .subscribe(
          (data: any) => {
            this.save = false;
            this.isUpdate = false;
            this.isDelete = false;
            this.showProperty = false;
            this.success = true;
            this.popmessage = data;
            this.getPropertyData();

          },
          (error) => {
            this.save = false;
            this.isUpdate = false;
            this.isDelete = false;
            this.showProperty = false;
            const errorData = error.json();
            this.error = true;
            this.popmessage = errorData.Message;
            console.log('error:', errorData);

          });
      }
    }
  }

  getActivePropertyGroup() {
    const obj = new PropertyGroup();
    obj.Operation = 'GetRecordsByStatus';
    obj.Active = 1;

    this.ServiceURL.CreatePropertyGroup(obj)
      .subscribe(
      (data: PropertyGroup[]) => {
        this.propertyGroupListforPorperty = data;
      },
      (error) => {

        const errorData = error.json();
        console.log('error:', errorData);

      });

  }

  getTimezoneList() {
    this.ServiceURL.GetTimeZoneList()
      .subscribe(
      (data: TimeZone[]) => {
        this.timezoneList = data;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
      }
      )
  }
  logCheckbox(element: HTMLInputElement) {
    if (element.checked)
      this.isActive = 1;
    else
      this.isActive = 0;
  }
  onDeletConfirmationPG() {
    this.save = true;
    const obj = new PropertyGroup();
    obj.Name = this.pgnameModal;
    obj.CustomerID = this.selectCustomer.nativeElement.value;
    obj.Active = this.isActive;
    obj.ID = this.productId;
    obj.TimeZone = this.selectTimePG.nativeElement.value;
    obj.Operation = 'DeleteRecord';
    this.ServiceURL.CreatePropertyGroup(obj)
      .subscribe(
      (data: any) => {
        this.save = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.showPG = false;
        this.success = true;
        this.popmessage = data;
        this.getPropertyGroupData();

      },
      (error) => {
        this.save = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.showPG = false;
        const errorData = error.json();
        this.error = true;
        this.popmessage = errorData.Message;
        console.log('error:', errorData);

      });
  }
  onPropertyGroupDataSave() {
    if (this.pgnameModal == '' || this.pgnameModal == undefined) {
      this.alerts = [];

      this.alerts.push({
        id: 1,
        type: 'danger',
        message: 'Please Fill Property Group Name',
      });
      this.validation = true;
    }
    else {

      if (this.checkForSpecialChar(this.pgnameModal)) {
        this.alerts = [];

        this.alerts.push({
          id: 1,
          type: 'danger',
          message: 'special characters like !@#$%^&*.,<>/\'";:? Not allowed',
        });
        this.validation = true;
      }

      else {
        this.save = true;
        const obj = new PropertyGroup();
        obj.Name = this.pgnameModal;
        obj.CustomerID = this.selectCustomer.nativeElement.value;
        obj.Active = this.isActive;
        obj.ID = this.productId;
        obj.TimeZone = this.selectTimePG.nativeElement.value;
        if (this.isUpdate) {
          obj.Operation = 'UpdateRecord';

        }
        else if (this.isDelete) {
          obj.Operation = 'DeleteRecord';
        }
        else {
          obj.Operation = 'InsertRecord';
        }
        this.ServiceURL.CreatePropertyGroup(obj)
          .subscribe(
          (data: any) => {
            this.save = false;
            this.isUpdate = false;
            this.isDelete = false;
            this.showPG = false;
            this.success = true;
            this.popmessage = data;
            this.getPropertyGroupData();

          },
          (error) => {
            this.save = false;
            this.isUpdate = false;
            this.isDelete = false;
            this.showPG = false;
            const errorData = error.json();
            this.error = true;
            this.popmessage = errorData.Message;
            console.log('error:', errorData);

          });


      }

    }

  }

  getPropertyGroupData() {
    this.ServiceURL.GetPropertyGroup()
      .subscribe(
      (data: PropertyGroup[]) => {
        this.propertGroupList = data;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);

      });
  }

  getCustomer() {
    this.ServiceURL.getCustomer()
      .subscribe(
      (data: Customer[]) => {
        this.customerArray = data;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);

      });
  }

  getPropertyData() {
    const obj = new Property();
    obj.Operation = 'GetInfo';
    this.ServiceURL.PropertyOperation(obj)
      .subscribe(
      (data: Property[]) => {
        this.propertyList = data;
        console.log(data);
        this.filterproperty = data;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);

      });
  }

  onChangeFilter(pgId: number) {
    if (this.propertyList.length > 0) {
      if (pgId == 0)
        this.filterproperty = this.propertyList;
      else
        this.filterproperty = this.propertyList.filter(Property => Property.PropertyGroupID == pgId);
    }


  }
  onPGDelete(id: number) {
    this.connection = 'PropertyGroup';
    this.warning = true;
    this.productId = id;
    this.operationno = 1;

  }
  onPGEdit(iobj: PropertyGroup) {
    this.header = 'Edit Property Group';
    
    this.customerdisabled = false;
    this.pgnamedisabled = false;
    this.pgtimedisabled = false;
    this.pgcheckboxdisabled = false;
    this.showPGButton = true;
    this.pgnameModal = iobj.Name;
    this.productId = iobj.ID;
    this.ddCid = iobj.CustomerID;
    //  if (iobj.Active == 1) {
    //   this.PGactive = true;

    // }
    // else {
    //   this.PGactive = false;

    // }
    this.PGactive = iobj.Active == 1 ? true : false;
    this.selectedTimezone = iobj.TimeZone;
    this.showPG = true;
    this.isUpdate = true;

  }
  onViewPg(iobj: PropertyGroup) {
    this.header = 'View Property Group';
    this.customerdisabled = true;
    this.pgnamedisabled = true;
    this.pgtimedisabled = true;
    this.pgcheckboxdisabled = true;
    this.PGactive = true;
    this.pgnameModal = iobj.Name;
    this.productId = iobj.ID;
    this.ddCid = iobj.CustomerID;
    this.PGactive = iobj.Active == 1 ? true : false;
    this.selectedTimezone = iobj.TimeZone;
    this.showPG = true;
    this.isUpdate = true;
    this.showPGButton = false;

  }
  onDeleteConfirmation() {
    // this.connection = this.operationno == 1 ? 'PropertyGroup' : 'Property';
    this.warning = false;
    this.isDelete = true;
    if (this.operationno == 1) {

      this.onDeletConfirmationPG();
    }
    else {

      this.onConfirmPropertyDelete();
    }




  }

  onViewP(objp: Property) {
    this.header = 'View Property';
    this.selectProperyName = objp.Name;
    this.productId = objp.ID;
    this.ddP = objp.PropertyGroupID;
    if (objp.Active == 1) {
      this.Pactive = true;
      console.log('1:', this.Pactive);
    }
    else {
      this.Pactive = false;
      console.log('0:', this.Pactive);
    }
    // this.Pactive = objp.Active == 1 ? true : false;
    this.selectedTimezone = objp.TimeZone;
    this.showProperty = true;
    this.isUpdate = true;

    this.pgdisabled = true;
    this.propertynamedisabled = true;
    this.checkboxdisabled = true;
    this.timezonedisabled = true;
    this.showPropertyButton = false;
  }
  onPropertyEdit(objp: Property) {
    this.header = 'Edit Property';
    this.selectProperyName = objp.Name;
    this.productId = objp.ID;
    this.ddP = objp.PropertyGroupID;
    if (objp.Active == 1) {
      this.Pactive = true;
      console.log('1:', this.Pactive);
    }
    else {
      this.Pactive = false;
      console.log('0:', this.Pactive);
    }
    // this.Pactive = objp.Active == 1 ? true : false;
    this.selectedTimezone = objp.TimeZone;
    this.showProperty = true;
    this.isUpdate = true;
    this.pgdisabled = false;
    this.propertynamedisabled = false;
    this.checkboxdisabled = false;
    this.timezonedisabled = false;
    this.showPropertyButton = true;

  }

  onPropertyDelete(id: number) {
    this.connection = 'Property';
    this.warning = true;
    this.productId = id;
    this.operationno = 2;
  }
}
