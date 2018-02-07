import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PropertyGroup} from '../../modal/propertygroup-modal.modal';
import { ERService } from '../../shared/services/er-service.service';
import { LicenseManager, UpdateLicenseModel } from '../../modal/license-manager-model.model';

@Component({
  selector: 'app-license-manager',
  templateUrl: './license-manager.component.html',
  styleUrls: ['./license-manager.component.css']
})
export class LicenseManagerComponent implements OnInit {

  CurrentStatus : string = "No Property Group selected";
  View = false;
  Update = false;
  ViewDetails = false;
  showpropertygroup = false;
  propertygroup : PropertyGroup[];
  setPg = 0;
  noGroupIdMsg = "No Property Group selected";
  hasViewed = true;
  showDialog = false;
  error = false;
  popmessage = "";
  value = "";
  noGroupSelected = false;

  licenseManager : LicenseManager;
  licenseKeyDetails : LicenseManager;
  @ViewChild('LicenseKey') LicenseKey;

  constructor(public ServiceURL: ERService) {
    this. getActivePropertyGroup();
    this.licenseManager = new LicenseManager();
    this.licenseKeyDetails = new LicenseManager();
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
        this.showpropertygroup = false;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showpropertygroup = false;
      });
  }

  PageLoadByGroupId(groupid : number)
  {
    this.GetLicenseStatus(groupid);
    this.GetLicenseDetails(groupid);
  }
  
  onChangePG(id: number)
  {
    this.setPg = id;
    console.log('any:', id)
    if(id == 0)
    {
      this.CurrentStatus = "No Property Group selected";
      this.hasViewed = true;
    } 
    else
    { 
      this.noGroupSelected = false;
      this.PageLoadByGroupId(id);
    }
  }

  GetLicenseStatus(groupid : number)
  {
    this.ServiceURL.GetLicenseStatus(groupid)
      .subscribe(
        (data : any) =>{
          console.log('anyGetLicenseStatus:', data)
          this.CurrentStatus = data;
        },
        (error)=>
        {
          console.log('error GetLicenseStatus :', error)
        }
      )
  }

  GetLicenseDetails(groupid : number)
  {
    this.ServiceURL.GetLicenseDetails(groupid)
      .subscribe(
        (data : LicenseManager) =>{
          console.log('anyGetLicenseStatus:', data)
          this.licenseManager = data;
        },
        (error)=>
        {
          this.error = true;
          const errorData = error.json();
          console.log('error:', errorData.Message);
          this.popmessage=errorData.Message;
        }
      )
  }

  onView()
  {
    this.View = true;
    this.ServiceURL.GetLicenseKeyDetails(this.value)
    .subscribe(
      (data : LicenseManager) =>{
        console.log('anyGetLicenseStatus:', data)
        this.licenseKeyDetails = data;
        this.ViewDetails = true;
        this.View = false;
        this.hasViewed = false;
      },
      (error)=>
      {
        this.View = false;
        this.error = true;
        const errorData = error.json();
        console.log('error:', errorData.Message);
        this.popmessage=errorData.Message;
      }
    )
  }

  onKeyUpdate()
  {
    this.noGroupSelected = false;
    let gid =  this.setPg;
    this.Update = true;
    console.log('any:', gid)
    if(gid == 0)
    {
      this.noGroupSelected = true;
      this.Update = false;
    } 
    else
    { 
      let licenseKey = this.value;
      let pgname = this.propertygroup.find(id=>id.ID == gid);
      console.log('pgname:', JSON.stringify(pgname.Name))
      let updateLicenseModel = new UpdateLicenseModel();
      updateLicenseModel.PropertyGroupID = String(gid);
      updateLicenseModel.LicenseKeyString = licenseKey;
      updateLicenseModel.PropertyGroupName = pgname.Name;
      this.ServiceURL.UpdateLicenseKey(updateLicenseModel )
      .subscribe(
        (data : any) =>{
          console.log('oonKeyUpdatenView:', data);
          this.showDialog = true;
          this.popmessage = data;
          this.PageLoadByGroupId(gid);
          this.Update = false;
          this.hasViewed = true;
          this.LicenseKey.nativeElement.value = "";
        },
        (error)=>
        {
          this.error = true;
          this.Update = false;
          const errorData = error.json();
          console.log('error:', errorData.Message);
          this.popmessage=errorData.Message;
        }
      )
    }
  }

}
