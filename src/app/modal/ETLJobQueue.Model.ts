export class ETLJobQueue
{
    ID : number;
    DestinationTableName: string;
    RunningStatus : string;
    InsertedDateTime: string;
    LastActivityDateTime : string;
    ExtractJobID : number;
    ExtractControlID: number;
    ExtractControlExecutionID: number;
    OnDemand : boolean;
    Priority: number;

}