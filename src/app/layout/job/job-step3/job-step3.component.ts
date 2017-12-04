import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../../shared/services/er-service.service';
import {
  ExtractControl, MasterClass, ConEngineType, ConnectionClass, ConnectionType,
  TableLoadType
} from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-job-step3',
  templateUrl: './job-step3.component.html',
  styleUrls: ['./job-step3.component.css']
})
export class JobStep3Component implements OnInit {
  connectiontype: ConnectionType[];
  connectionengin: ConEngineType[] = [];
  engineall: ConEngineType[];
  filterconnectionengine = [];
  connection: ConnectionClass[];
  connectionall: ConnectionClass[];
  filterconnection = [];
  loadtype: TableLoadType[];
  extracContol: ExtractControl[];
  updateextracContol: ExtractControl[];
  isChecked: boolean = false;
  flagSave: boolean;
  filterSource:string;
  resetSor = 0;
  resetLoad = 0;

  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.fetchExtractControlData(this.data.selectedJob.ProductId, this.data.selectedJob.JobID);
    this.fetchMasterData(this.data.selectedJob.ProductId, this.data.selectedJob.PropertyId);
    this.filterconnectionengine = [];
  }


  ngOnInit() {
  }
  fetchExtractControlData(productid: number, jobid: number) {
    this.ServiceURL.GetExtractControl(productid, jobid)
      .subscribe(
      (data: ExtractControl[]) => {
        this.extracContol = data;
        console.log('data:', data);
        this.updateextracContol = this.extracContol;
        //  Array.from(new Array(data.length), (val, index) => index);
      },
      (error) => {
        console.log(error.json());
      }
      )
      ;
  }
  fetchMasterData(productid: number, propertyid: number) {
    this.ServiceURL.GetMaterList(propertyid, productid)
      .subscribe(
      (data: MasterClass) => {
        this.connection = data.ConnectionList;
        this.filterconnection[this.connection.length] = this.connection;
        this.connectionengin = data.EngineType;
        this.filterconnectionengine[this.connectionengin.length] = this.connectionengin;
        this.connectiontype = data.ConnectionType;

        this.loadtype = data.LoadList;
        if (this.connection.length == 0) {
          //warning message box that conection not configured for this property;
        }
      },
      (error) => {
        console.log(error.json());
      }
      );
  }

  checkAll(ev) {
    this.isChecked = ev.target.checked;
    if(!this.isChecked){
      this.engineall = [];
      this.connectionall =[];
      this.resetSor = 0;
      this.resetLoad = 0;
    }
  }
  onSourceSelectAll(connectionTypeID: number) {
    this.resetSor = connectionTypeID;
    if (this.isChecked){
      this.engineall = this.connectionengin.filter((item) => item.ConnectionTypeID == connectionTypeID);
      this.connectionall =[];
    }
  }
  onSourceSelect(connectionTypeID: number, i: number, tablename: string) {
    if (!this.isChecked)
      this.filterconnectionengine[i] = this.connectionengin.filter((item) => item.ConnectionTypeID == connectionTypeID);

  }
  onEngineSelectAll(providerID: number) {
    if (this.isChecked) {
      this.connectionall =
        this.connection.filter((item) => item.ConnectionProviderID == providerID);
      this.updateextracContol.forEach(x => x.ConEngineTypeID = providerID);
    }
  }
  onEngineSelect(providerID: number, i: number, tablename: string) {
    if (!this.isChecked) {
      this.filterconnection[i] =
        this.connection.filter((item) => item.ConnectionProviderID == providerID);
      this.updateextracContol.forEach(x => { if (x.DestinationTableName == tablename) x.ConEngineTypeID = providerID });
    }

  }

  onConnectionSelectAll(connectionID: number) {
    if (this.isChecked)
      this.updateextracContol.forEach(x => x.ConnectionID = connectionID);
  }

  onConnectionSelect(connectionID: number, i: number, tablename: string) {
    this.updateextracContol.forEach(x => { if (x.DestinationTableName == tablename) x.ConnectionID = connectionID });
    console.log(this.updateextracContol);

  }
  onLoadSelectAll(loadID: number) {
    this.resetLoad = loadID;
    if (this.isChecked)
      this.updateextracContol.forEach(x => x.LoadTypeID = loadID);

  }
  onLoadSelect(loadID: number, i: number, tablename: string) {
    if (!this.isChecked)
      this.updateextracContol.forEach(x => { if (x.DestinationTableName == tablename) x.LoadTypeID = loadID });

  }

  onNext4Step() {
    let array = [];
    array = this.updateextracContol.filter((item) => item.ConnectionID == 0 || item.LoadTypeID == 0);
    if (array.length == 0) {
      this.flagSave = true;
      this.ServiceURL.UpdateExtractByLoadandConnetion(this.updateextracContol)
        .subscribe(
        (data: ExtractControl[]) => {
          console.log(data);
          this.flagSave = false;
          this.router.navigate(['../job-step4']);
        },
        (error) => {
          console.log(error.json());
          this.flagSave = false;
        }
        );
    }
    else {
      console.log("error:connrction id should be select ");
    }
  }

  onBackJob2() {
    this.router.navigate(['../job-step2']);
  }
}

