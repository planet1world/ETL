export class ConnectionClass {
    PropertGroup: string;
    Property: string;
    Connection: string;
    ConnectionID:number;
    ConnectionName: string;
    ConnectivityType: string;
    ConnectionProvider: string;
    ConnectionProviderID: number;
    ServerName: string;
    UserName: string;
    Database: string;
    Schema: string;
    Version: string;
    Folderlocation: string;
}
/// <summary>
/// CSV,XML,MYSQL, SQLSERVER
/// </summary>
export class ConEngineType {
    /// <summary>
    /// id of item
    /// </summary>
    ID: number;
    /// <summary>
    /// name of item
    /// </summary>

    Name: string;
    /// <summary>
    /// id of parent for item
    /// </summary>
    ConnectionTypeID: number;

}

/// <summary>
/// for geting connection i.e File-1,DataBase-2
/// </summary>
export class ConnectionType {
    ID: number;

    Name: string;

}