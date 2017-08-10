export interface SourceConnectionClass{
    connectionid:number;
    propertygroupid:number;
    propetyid:number;
    connectionname:string;
    connectiontypeid:number;
    connectionproviderid:number;
    servername:string;
    username:string;
    password:string;
    databasename:string
    databaseversion:string;
    schema:string;
    folderlocation:string;
    requestinfo:string;

}
export interface TestConnection {
    servername: string; // text  
    username: string; // radio
    password: string; // select (primitive)
    databasename: string; // select (object)
    provider: number;
   
}
