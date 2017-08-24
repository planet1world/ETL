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
  connectionall:ConnectionClass[];
  filterconnection = [];
  loadtype: TableLoadType[];
  extracContol: ExtractControl[];
  updateextracContol: ExtractControl[];
  isChecked: boolean;

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
        this.connectionengin = data.EngineType;
        this.connectiontype = data.ConnectionType;
        this.loadtype = data.LoadList;
        console.log(this.connectionengin);
      },
      (error) => {
        console.log(error.json());
      }
      );
  }

  checkAll(ev) {
    this.isChecked = ev.target.checked;
  }
  onSourceSelectAll(connectionTypeID: number) {
    
    if(this.isChecked)
    this.engineall = this.connectionengin.filter((item) => item.ConnectionTypeID == connectionTypeID);
  }
  onSourceSelect(connectionTypeID: number, i: number, tablename: string) {
    if(!this.isChecked)
    this.filterconnectionengine[i] =this.connectionengin.filter((item) => item.ConnectionTypeID == connectionTypeID);

  }
  onEngineSelectAll(providerID: number) {
    if (this.isChecked) {
      this.connectionall =
        this.connection.filter((item) => item.ConnectionProviderID == providerID);
      this.updateextracContol.forEach(x => x.ConEngineTypeID = providerID);
    }
  }
  onEngineSelect(providerID: number, i: number, tablename: string) {
    if(!this.isChecked)
      {
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
    if (this.isChecked)
      this.updateextracContol.forEach(x => x.LoadTypeID = loadID);
    
  }
  onLoadSelect(loadID: number, i: number, tablename: string) {
    if(!this.isChecked)
    this.updateextracContol.forEach(x => { if (x.DestinationTableName == tablename) x.LoadTypeID = loadID });
  
  }
}

