import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Config } from '../modal/config-modal.modal';
@Injectable()
export class servicelist {

    loginServiceURL: string;
    userName: string;
    changePasswordServiceURL: string;
    getConnectionSource: string;
    getConnectionType: string;
    getConEngineType: string;
    getTestConection: string;
    RetrieveSQLSchemaList: string;
    CreateNewSourceConnection: string;
    GetConnectionList: string;
    DeletConnection: string;
    CreatePropertyGroup: string;
    GetPropertyGroup: string;
    EditPropertyGroup: string;
    TimezoneList: string;
    PropertyOperation: string;
    GetCustomer: string;
    ProductOperation: string;
    TGetProductList: string;
    TGetTablesforProduct: string;
    GetColumnforTable: string;
    configurationobject: Config;
    TemplateList: string;
    ProductTable: string;
    GetSchema: string;
    TGetColumnforTable: string;
    GetPrimaryKey: string;
    InsertProductColoumn:string;
    Treeview:string;
    GetProductCommited:string;
    AutoSelection:string;
    ViewConnection:string;
    GetPropertyList:string;
    AddJob:string;
    GetJobForProduct:string;
    GetTableForJob:string;
    ExtCntrlInsertion:string;
    GetMasterData:string;
    GetExtractControl:string;
    UpdateConAndLoadExtractControl:string;
    GetTableListforJobMapping:string;
    FetchSourceTable:string
    AutoMappingOfColumn:string;
    UpdateColumnMappingExtractControl:string;
    GetSummaryOfTableByJobID:string;
    UpdateFilterForJobTables:string;
    JobScheduling:string;
    GetAllJobs: string;
    DeleteJobOperation : string;


    constructor(private http: Http) {
        this.getUrl()
            .subscribe(
            (data: Config) => {
                this.configurationobject = data;
                this.setUrl(this.configurationobject.Url);

            },
            (error) => {
                const errorData = error.json();
                console.log('error:', errorData);

            });



    }

    getUrl() {
        return this.http.get("./assets/config/config.json")
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            );
    }

    setUrl(url: string) {
        this.loginServiceURL = url + "Token";
        this.changePasswordServiceURL = url + "api/Account/ChangePassword";
        this.getConnectionSource = url + "api/ConnectionManager/GetConnectionSource"
        this.getConnectionType = url + "api/ConnectionManager/GetConnectionType"
        this.getConEngineType = url + "api/ConnectionManager/GetConEngineType"
        this.getTestConection = url + "api/ConnectionManager/TestConnectionWithDBList";
        this.RetrieveSQLSchemaList = url + "api/ConnectionManager/RetrieveSQLSchemaList";
        this.CreateNewSourceConnection = url + "api/ConnectionManager/CreateNewSourceConnection";
        this.GetConnectionList = url + "api/ConnectionManager/GetConnectionList";
        this.DeletConnection = url + "api/ConnectionManager/DeletConnection";
        this.CreatePropertyGroup = url + "api/Property/PropertyGroupOperation";
        this.GetPropertyGroup = url + "api/Property/GetPropertyGroup";
        this.EditPropertyGroup = url + "api/Property/PropertyGroupOperation";
        this.TimezoneList = url + "api/Property/GetTimeZoneList";
        this.PropertyOperation = url + "api/Property/PropertyOperation";
        this.GetCustomer = url + "api/Property/GetCustomer";
        this.ProductOperation = url + "api/Product/ProductOperation";
        this.TemplateList = url + "api/Product/GetTemplate";
        this.TGetProductList = url + "api/Product/TemplateProductList";
        this.TGetTablesforProduct = url + "api/Product/TemplateTablesforProduct";
        this.TGetColumnforTable = url + "api/Product/TemplateColumnforTable";
        this.GetPrimaryKey = url + "api/Product/GetPrimaryKey";
        this.ProductTable = url + "api/Product/ProductTable";
        this.GetSchema = url + "api/Product/GetSchema";
        this.InsertProductColoumn = url + "api/Product/ProcessProductTable";
        this.Treeview=url+"api/Product/TreeView";
        this.GetProductCommited=url+ "api/Product/GetProductCommited";
        this.AutoSelection=url+"api/Product/AutoSelection";
        this.ViewConnection=url+"api/ConnectionManager/GetViewAndEditConnection";
        this.GetPropertyList=url+"api/Property/GetPropertyByPropertyGroup";
        this.AddJob=url+"api/Job/AddJob";
        this.GetJobForProduct=url+"api/Job/GetJobForProduct";
        this.GetTableForJob=url+"api/Job/GetTableForJob";
        this.ExtCntrlInsertion=url+"api/Job/ExtCntrlInsertion";
        this.GetMasterData=url+"api/Job/GetMasterList";
        this.GetExtractControl=url+"api/Job/GetListofExtractControl";
        this.UpdateConAndLoadExtractControl=url+"api/Job/UpdateConAndLoadExtractControl";
        this.GetTableListforJobMapping=url+"api/Job/GetTableListforJobMapping";
        this.FetchSourceTable=url+"api/Job/FetchSourceTable";
        this.AutoMappingOfColumn=url+"api/Job/AutoMappingOfColumn";
        this.UpdateColumnMappingExtractControl=url+"api/Job/UpdateColumnMappingExtractControl";
        this.GetSummaryOfTableByJobID=url+"api/Job/GetSummaryOfTableByJobID";
        this.UpdateFilterForJobTables=url+"api/Job/UpdateFilterForJobTables";
        this.JobScheduling=url+"api/Job/JobScheduling";
        this.GetAllJobs = url + "api/Job/GetAllJobs";
        this.DeleteJobOperation=url+"api/Job/DeletJob";

    }

}
