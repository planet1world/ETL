import { ConEngineType, ConnectionClass, ConnectionType,TableColumn } from '../modal';
export class Job {
    JobID: number;
    JobName: string;
    Active: boolean;
    PropertyId: number;
    PropertyName: string;
    PropertyGroupId: number;
    PropertyGroupName: string;
    ProductId: number;
    ProductName: string;
    Description: string;
}
export class JobTables extends Job {
    TableId: number;
    TableName: number;
    TableNamewithSchema: string;
    Selected: boolean;
    Disable: boolean;

}
export class ExtractControl {
    ExtractControlID: number;
    SourceTableName: string;
    DestinationTableName: string;
    ConEngineTypeID: number;
    ProductID: number;
    ConnectionID: number;
    SourceQuery: string;
    SourceQueryMapping: string;
    SourceQueryFilterCondition: string;
    MappedColumnCount: number;
    ExecutionOrderGroup: string;
    ExecutionOrder: string;
    RecentExecutionStatus: number;
    PrimaryKeyColumns: string;
    ProcessType: string;
    JobID: number;
    LoadTypeID: number;
    StatusID: number;
    SourceTypeName:string;
    EngineTypeName:string;
    ConnectionName:string;
    LoadName:string;
}
/// <summary>
/// Load type Incremental/Turncate etc 
/// </summary>
export class TableLoadType {
    /// <summary>
    /// ID of item
    /// </summary>
    ID: number;
    /// <summary>
    /// Name of item
    /// </summary>
    LoadName: string;
}

export class MasterClass {
    ConnectionType: ConnectionType[];
    EngineType: ConEngineType[];
    ConnectionList: ConnectionClass[];
    LoadList: TableLoadType[];
}

export class JobTableList{
    ConnectionString:string;
    TableName:string;
    Schema:string;
    DataBase:string;
    ConnectionType:string;
    ExtractControlID:number;
}
export class AutoMapping{
    ColumnName:TableColumn;
    Source:TableColumn[];
    AutoMapped:string;
    DestinationTableName:string;
    SourceTableName:string;
}

export class AutoMappingRequest{
    Productid:number;
    DestinationTable:string;
    SourceData:JobTableList
}
export class PostAutoColumnMapping
{
    ExtractControlID:number;
    AutoMapping:AutoMapping[];
}
export class JobSummaryTables
{
    ExtractControlID:number;
    DTableName:string;
    STableName:string;
    FilterCondition:string;
    MappedCount:number;
    ProcessType:string;
    JobID:number;
    ConEngineType:string;

}