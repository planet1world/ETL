import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ERService } from '../../../shared/services/er-service.service';
import { JobTableList, AutoMapping, AutoMappingRequest, PostAutoColumnMapping } from '../../../modal';
import { Data } from '../../../shared/data/data';

@Component({
  selector: 'app-job-step4',
  templateUrl: './job-step4.component.html',
  styleUrls: ['./job-step4.component.css']
})
export class JobStep4Component implements OnInit {
  jobTableList: JobTableList[];
  sourceTableList: JobTableList[];
  filterSourceTableList: JobTableList[];
  selectSourcetableList: JobTableList[];
  autoMapped: AutoMapping[];
  flagDestinationTable: boolean;
  flagSourceTable: boolean;
  flagColumnMapping: boolean;
  flagSaveNext: boolean;
  flagNext: boolean;
  objectDestination: JobTableList;
  selectDesTable: string;
  saveTable: string[] = [];
  isDisable = true;
  filterSource="";
  error = false;
  popmessage: string;

  constructor(public ServiceURL: ERService, public router: Router, private data: Data) {
    this.fetchTablesForJob(this.data.selectedJob.JobID);
  }
  @ViewChild('destinationtableDD') destinationtableDD;
  @ViewChild('sourcetableDD') propertyDD;

  ngOnInit() {
  }
  fetchTablesForJob(jobid: number) {
    this.flagDestinationTable = true;
    this.ServiceURL.GetTableListforJobMapping(jobid)
      .subscribe(
      (data: JobTableList[]) => {
        this.jobTableList = data;
        this.flagDestinationTable = false;
      },
      (error) => {
        console.log(error.json());
        this.flagDestinationTable = false;;
      }
      );
  }
  onDestinationTableDDChange(tablename: string) {
    let filter = this.jobTableList.filter((item) => item.TableName == tablename);
    console.log(JSON.stringify(filter));
    this.selectDesTable = tablename;
    this.objectDestination = filter[0];
    if (this.objectDestination != undefined) {
      this.flagSourceTable = true;
      this.ServiceURL.FetchSourceTableforMapping(filter[0])
        .subscribe(
        (data: JobTableList[]) => {
          this.sourceTableList = data;
          this.filterSourceTableList = data;
          this.flagSourceTable = false;

        },
        (error) => {
          console.log(error.json());
          this.flagSourceTable = false;
        }
        );
    }
  }
  onView(ev) {

    if (ev.target.checked) {
      this.filterSourceTableList = this.sourceTableList.filter((item) => item.ConnectionType == 'View');
    }
    else {
      this.filterSourceTableList = this.sourceTableList.filter((item) => item.ConnectionType != 'View');
    }
  }
  onSourceTableDDChange(tablename: string) {
    this.selectSourcetableList = this.filterSourceTableList.filter((item) => item.TableName == tablename);
  }
  onMappingClick() {

    let request = new AutoMappingRequest();
    request.Productid = this.data.selectedJob.ProductId;
    request.DestinationTable = this.objectDestination.TableName;
    let SourceData = new JobTableList();
    SourceData.ConnectionString = this.objectDestination.ConnectionString;
    SourceData.ConnectionType = this.objectDestination.ConnectionType;
    SourceData.DataBase = this.objectDestination.DataBase;
    SourceData.Schema = this.objectDestination.Schema;
    SourceData.TableName = this.selectSourcetableList[0].TableName;
    request.SourceData = SourceData;
    console.log(request);
    this.flagColumnMapping = true;
    this.ServiceURL.PostAutoMappingOfColumn(request)
      .subscribe(
      (data: any) => {
        console.log(data);
        this.autoMapped = data;
        this.flagColumnMapping = false;
      },
      (error) => {
        this.flagColumnMapping = false;
        console.log(error.json());
      }
      )


  }

  onSubmit() {
    console.log(this.autoMapped);
  }

  onSaveNextTable() {
    let count = 0;
    let selectArray = this.autoMapped.filter((item) => item.AutoMapped != null);
    if (selectArray.length == 0) {
      this.error = true;
      this.popmessage = "Select at least one Source Column";
    }
    else {

      let selectArray = this.autoMapped.filter((item) => item.ColumnName.Selected== true);
      var isPrimaryMapped = null
      if(selectArray.length > 0)
      {
        isPrimaryMapped = selectArray[0].AutoMapped;
      }

      if(isPrimaryMapped == null)
      {
        this.error = true;
        this.popmessage = "Map primary key column";
      }
      else
      {
        let postData = new PostAutoColumnMapping();
        postData.AutoMapping = this.autoMapped;
        postData.ExtractControlID = this.objectDestination.ExtractControlID;
        console.log('postData:= ' +JSON.stringify( postData));
        this.flagSaveNext = true;
        this.ServiceURL.PostUpdateColumnMapping(postData)
          .subscribe(
          (data) => {
            this.CheckTableIsSave(this.selectDesTable);
            this.Next();
            this.flagSaveNext = false;

          },
          (error) => {
            this.flagSaveNext = false;
            console.log(error.json());
          }
          );
      }
    }
  }

  Next() {
    this.autoMapped = [];
    let count = this.jobTableList.findIndex(item => item.TableName === this.selectDesTable);

    if (count == -1) {
      count = 0;
    }
    else {
      count = count + 1;
    }
    console.log(count, this.jobTableList.length);
    if (count < this.jobTableList.length) {
      this.selectDesTable = this.jobTableList[count].TableName;
      this.onDestinationTableDDChange(this.selectDesTable);
    }
  }
  onNextTable() {
    this.Next();
  }

  CheckTableIsSave(tablename: string) {
    if (this.saveTable.length == 0) {
      this.saveTable.push(tablename);
    }
    else {
      let count = this.saveTable.findIndex(item => item === tablename)
      if (count == -1)
        this.saveTable.push(tablename);

    }
    console.log(this.saveTable);
    if (this.saveTable.length == this.jobTableList.length)
      this.isDisable = false;
  }

  onNext5Step() {
    if (this.saveTable.length == this.jobTableList.length)
    {
      this.router.navigate(['../job-step5']);
    }
    else
    {   
      if (this.saveTable.length == 0) {
        this.error = true;
        this.popmessage = "Map all destination tables";
      } 
      else
      {
        var tablename = "";
        for(var arrayItem of this.jobTableList) {
          tablename = arrayItem.TableName;
              let count = this.saveTable.findIndex(item => item === tablename)
              if (count == -1)
              {
                 break;
              }
        }
        if(tablename != "")
        {
          this.error = true;
          this.popmessage = "Map destination table " + tablename + " with source table";
        }
      }
      
    }
    
  }
  onBack() {
    this.router.navigate(['../job-step3']);
  }

}
