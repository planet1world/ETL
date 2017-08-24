import { ConEngineType, ConnectionClass, ConnectionType } from '../modal';
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