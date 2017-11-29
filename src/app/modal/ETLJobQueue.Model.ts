export class ETLJobQueue
{
    ETLID : number;
    DestinationTableName: string;
    Status : string;
    InsertedDateTime: string;
    ExtractControlExecutionHistID: number;
    OnDemand : boolean;
    Priority: number;
    JobName : string;
    LastRun : string;
    NextRun : string;
    Result : string;
}

export class JobQueueHist
{
    ExtractJobHistID : number;
    JobID : number;
    JobName : string;
    PropertyGroupName : string;
    PropertyName : string;
    ProductName : string;
    Status : string;
    StartTime : string;
    EndTime : string;
    JobQueueHistDetail : JobQueueHistDetail
}

export class JobQueueHistDetail
{
    HistID : number;
    ExtractControlID : number;
    DestinationTableName : string;
    SourceTableName : string;
    Status : string;
    StartTime : string;
    EndTime : string;
    LoadTypeName  : string;
    Inserted : string;
    Updated : string;
    Message : string;
}

export class JobSearchParams
{
    PropertyGroupID : number;
    PropertyID : number;
    ProductID : number;
    JobName : string;
    StartDatetime : string;
    EndDatetime : string;
    RecodsPerPage : number;
    PageNumber : number;
    JobID : number;
    JobRunID : number;
    SourceTableName : string;
    DestinationTableName : string;
}

export class ExtractControlTable
{
    ExtractControlTableID : number;
    ExtractControlTableName : string;
}