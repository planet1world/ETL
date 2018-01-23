export class LicenseManager
{
    LicenseStartDate : string
    LicenseEndDate : string
    FCSCustomerID : string
    PropertyGroupID : number
    FCSProductName : string
    FCSProductversion : string
    MaxNumberofProperties : string
    MaxNumberofDataSources : string
    MaxETLUsers : string
    InstallationType : string
    LicenseType : string
    ReportsandDashboardsSupport : string
    MaxNumberofReportUsers : string
    MaxNumberofPredictiveModel : string
    MaxDataSizeonDestinationDatabaseinGB : string
    SORNumber : string
    DataWarehousingSupport : string
    HostingServerMacAddress : string
}

export class UpdateLicenseModel
{
    PropertyGroupID : string;
    PropertyGroupName : string;
    LicenseKeyString : string;
}