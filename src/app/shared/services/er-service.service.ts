import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';
import { servicelist } from '../../services/servicelist';
// import { PropertyGroup, Property } from '../../modal/propertygroup-modal.modal';
import {
    ConnectionClass, PropertyGroup, Property, Product, Template, ProductTable,
    ProductTableStructure, Job, JobTables, ExtractControl, JobTableList,JobSummaryTables,JobSchedule, JobSearchParams,
    User, UpdateLicenseModel    } from '../../modal';
// import { Product, Template, ProductTable, ProductTableStructure } from '../../modal/product.modal';
@Injectable()
export class ERService {
    token: string;
    userName: string;
    loginurl: string;
    constructor(private http: Http, private serviceUrl: servicelist, public router: Router) {

    }
    getToken() {
        this.token = localStorage.getItem('token');
        return this.token;
    }

    getConnection() {
        const header = new Headers();
        // header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.getConnectionSource, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    getConnectionType() {

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())

        return this.http.get(this.serviceUrl.getConnectionType, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getConEngineType(connectivetype: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', connectivetype);

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.getConEngineType, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getConectionList(connectivetype: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', connectivetype);

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.GetConnectionList, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getConnectionView(coneectionid: number, sourceid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', String(coneectionid));
        params.set('sourceid', String(sourceid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.ViewConnection, requestOptions)
            .map(
            (response: Response) => {
                return response.json();;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getTestConnection(TestConnection: any) {
        let body = TestConnection;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.getTestConection, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    getDirectoryStatus(dir : string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('location', String(dir));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.GetDirectoryLocationStatus, requestOptions)
            .map(
            (response: Response) => {
                return response.json();;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getSchema(TestConnection: any) {
        let body = TestConnection;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.RetrieveSQLSchemaList, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    postNewConnectionData(SourceConnectionClass: any) {
        let body = SourceConnectionClass;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.CreateNewSourceConnection, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    DeleteConnection(id: any) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('id', id);
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get
            (this.serviceUrl.DeletConnection, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getCustomer() {
        const header = new Headers();
        // header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetCustomer, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    CreatePropertyGroup(PGObject: PropertyGroup) {
        let body = PGObject;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.CreatePropertyGroup, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    EditPropertyGroup(PGObject: PropertyGroup) {
        let body = PGObject;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.EditPropertyGroup, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetPropertyGroup() {
        const header = new Headers();
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetPropertyGroup, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetTimeZoneList() {
        const header = new Headers();
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.TimezoneList, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    PropertyOperation(PObject: Property) {
        let body = PObject;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.PropertyOperation, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    PostProductOperation(ObjectProject: Product) {
        let body = ObjectProject;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.ProductOperation, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetAllJobs() {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetAllJobs, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetAllJobsForProduct(propertyid : number, productid : number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('propertyId', String(propertyid));
        params.set('productId', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetAllJobsForProduct, requestOption)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetListOfExtractControls(jobid : number, productid : number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetListofExtractControlForOnDemand, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetAllSourceTables(pgID : number,  propID : number, prodID : number, jbname : string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('pgid', String(pgID));
        params.set('propertyid', String(propID));
        params.set('productid', String(prodID));
        params.set('jobname', jbname);
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetAllSourceTables, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetAllDestinationTables(pgID : number,  propID : number, prodID : number, jbname : string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('pgid', String(pgID));
        params.set('propertyid', String(propID));
        params.set('productid', String(prodID));
        params.set('jobname', jbname);
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetAllDestinationTables, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetListOfManageExtractControls(jobid : number, productid : number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetListOfManageExtractControl, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetExtractJobHistory(searchParams : JobSearchParams) {
        let body = searchParams;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.GetExtractJobHistory, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetExtractControlJobHistory(jobHistID : number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobHistID', String(jobHistID));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetExtractControlJobHistory, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetExtractJobHistoryDetail(searchParams : JobSearchParams) {
        let body = searchParams;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.GetExtractJobHistoryDetail, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    SetInactiveExtControls(extractControlsForInactive : ExtractControl[])
    {
        let body = extractControlsForInactive;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.SetTablesInactiveForDataSyncJob, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    SetActiveExtControls(extractControlsForInactive : ExtractControl[])
    {
        let body = extractControlsForInactive;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.SetTablesActiveForDataSyncJob, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    DeleteExtControls(extractControlsForInactive : ExtractControl[])
    {
        let body = extractControlsForInactive;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.DeleteSelectedExtractControls, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    AddSelectedInQueue(extractControlsForInactive : ExtractControl[])
    {
        let body = extractControlsForInactive;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.AddSelectedInQueue, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    RemoveSelectedFromQueue(extractControlsForInactive : ExtractControl[])
    {
        let body = extractControlsForInactive;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.RemoveSelectedFromQueue, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    ViewEtlQueue()
    {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetViewETLQueueJob, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetRunningJobs()
    {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetRunningJobs, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    DeleteJobOperation(ObjectProject: Job) {
        let body = ObjectProject;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.DeleteJobOperation, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getTemplateList() {
        const header = new Headers();
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.TemplateList, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getTemplateProductlist(obj: Template) {
        let body = obj;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.TGetProductList, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getTemplateTableList(obj: Template) {
        let body = obj;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.TGetTablesforProduct, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    processProductTable(obj: any[]) {
        let body = obj;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.ProductTable, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    getProductSchema() {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.get(this.serviceUrl.GetSchema, { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetPrimaryKeyforTable(connectionstring: string, tablelname: string, productid: string, schemaid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('connection', connectionstring);
        params.set('tablename', tablelname);
        params.set('productid', productid);
        params.set('schemaID', schemaid);

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.GetPrimaryKey, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    TGetColumnforTable(connectionstring: string, tablelname: string, productid: string, schemaid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('connection', connectionstring);
        params.set('tablename', tablelname);
        params.set('productid', productid);
        params.set('schemaID', schemaid);

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.TGetColumnforTable, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    PostProductStep3(obj: ProductTableStructure) {
        let body = obj;
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        return this.http.post(this.serviceUrl.InsertProductColoumn, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    AutoSelectforTable(connectionstring: string, tablelname: any[], productid: string, propertyid: string, schemaid: string) {
        let body = { 'tblst': tablelname, 'templateDBconString': connectionstring, 'productid': Number(productid), 'propertyid': Number(propertyid), 'schemaid': Number(schemaid) }
        //console.log(body);
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())

        return this.http.post(this.serviceUrl.AutoSelection, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetTreeView(productid: number, proprtyid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('productid', String(productid));
        params.set('propertyid', String(proprtyid));

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.Treeview, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetProductCommited(productid: number, proprtyid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('productid', String(productid));
        params.set('propertyid', String(proprtyid));

        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())
        let requestOptions = new RequestOptions({ headers: header });
        requestOptions.search = params;
        return this.http.get(this.serviceUrl.GetProductCommited, requestOptions)
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetPropertyList(propertygroupid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('propertygroupid', String(propertygroupid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetPropertyList, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    AddJob(jobobject: Job) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.AddJob, JSON.stringify(jobobject), { headers: header })
            .map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    UpdateJobStatus(jobobject: Job) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.UpdateJobStatus, JSON.stringify(jobobject), { headers: header })
            .map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetTableForJob(jobid: number, productid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetTableForJob, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetJobForProduct(porpertyid: number, productid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('propertyid', String(porpertyid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetJobForProduct, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    ExtractionControl(tableobject: JobTables[]) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.ExtCntrlInsertion, JSON.stringify(tableobject), { headers: header })
            .map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetMaterList(porpertyid: number, productid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('propertyid', String(porpertyid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetMasterData, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetExtractControl(productid: number, jobid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        params.set('productid', String(productid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetExtractControl, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    UpdateExtractByLoadandConnetion(listofobject: ExtractControl[]) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.UpdateConAndLoadExtractControl, JSON.stringify(listofobject),
            { headers: header }).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetTableListforJobMapping(jobid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetTableListforJobMapping, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    FetchSourceTableforMapping(objtable: JobTableList) {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.FetchSourceTable, JSON.stringify(objtable),
            { headers: header }).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    PostAutoMappingOfColumn(source: any) {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.AutoMappingOfColumn, JSON.stringify(source), { headers: header }
        ).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    PostUpdateColumnMapping(data: any) {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.UpdateColumnMappingExtractControl, JSON.stringify(data), { headers: header }
        ).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    JobStep5SummaryData(productid: number, jobid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        params.set('productid', String(productid));
        const header = this.CallHeader();
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;

        return this.http.get(this.serviceUrl.GetSummaryOfTableByJobID, requestOption)
            .map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });

    }

    UpdateFilterForTableJob(obj:JobSummaryTables[])
    {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.UpdateFilterForJobTables, JSON.stringify(obj), { headers: header }
        ).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    JobScheduling(obj:JobSchedule)
    {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.JobScheduling, JSON.stringify(obj), { headers: header }
        ).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    OndemandJobScheduling(obj:JobSchedule)
    {
        const header = this.CallHeader();
        return this.http.post(this.serviceUrl.OndemandJobScheduling, JSON.stringify(obj), { headers: header }
        ).map(
            (responce: Response) => {
                return responce.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetJobScheduleDetails(jobid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetJobScheduleDetails, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetJobExecutionStatus(jobid: number) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('jobid', String(jobid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetJobExecutionStatus, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    OnDemandRunNow(job: Job) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.OnDemandJobRunNow, JSON.stringify(job), { headers: header })
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    CreateUser(usr : User) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.CreateUser, JSON.stringify(usr), { headers: header })
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    UpdateUser(usr : User) {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.post(this.serviceUrl.UpdateUser, JSON.stringify(usr), { headers: header })
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }

    GetUserData(userid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userid', String(userid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.GetUserData, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    ResetUserPassword(userid: string) {
        let params: URLSearchParams = new URLSearchParams();
        params.set('userid', String(userid));
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        let requestOption = new RequestOptions({ headers: header });
        requestOption.search = params;
        return this.http.get(this.serviceUrl.ResetUserPassword, requestOption)
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetUsersList() {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return this.http.get(this.serviceUrl.GetUsersList, { headers: header })
            .map(
            (response: Response) => {
                return response.json();
            }
            ).catch(e => {
                if (e.status === 401) {
                    this.CallRedirectToLoginPage();
                }
                return Observable.throw(e);
            });
    }
    
    GetLicenseStatus(groupid : number)
    {
        let param : URLSearchParams = new URLSearchParams();
        param.set("groupid", String(groupid));
        const header = this.CallHeader(); 
        let option = new RequestOptions({headers : header});
        option.search = param;

       return this.http.get(this.serviceUrl.GetLicenseStatus, option)
        .map(
            (response:Response)=>{
            return response.json();
            }
        ).catch(e=>{
            if (e.status === 401) {
                this.CallRedirectToLoginPage();
            }
            return Observable.throw(e);
        })
    }

    GetLicenseDetails(groupid : number)
    {
        let param : URLSearchParams = new URLSearchParams();
        param.set("groupid", String(groupid));
        const header = this.CallHeader(); 
        let option = new RequestOptions({headers : header});
        option.search = param;

       return this.http.get(this.serviceUrl.GetLicenseDetails, option)
        .map(
            (response:Response)=>{
            return response.json();
            }
        ).catch(e=>{
            if (e.status === 401) {
                this.CallRedirectToLoginPage();
            }
            return Observable.throw(e);
        })
    }
    
    GetLicenseKeyDetails(licensekey : string)
    {
        let param : URLSearchParams = new URLSearchParams();
        param.set("licensekey", licensekey);
        const header = this.CallHeader(); 
        let option = new RequestOptions({headers : header});
        option.search = param;

       return this.http.get(this.serviceUrl.GetLicenseKeyDetails, option)
        .map(
            (response:Response)=>{
            return response.json();
            }
        ).catch(e=>{
            if (e.status === 401) {
                this.CallRedirectToLoginPage();
            }
            return Observable.throw(e);
        })
    }

    UpdateLicenseKey(updateLicenseModel : UpdateLicenseModel)
    {
        let body = updateLicenseModel; 
        const header = this.CallHeader(); 

       return this.http.post(this.serviceUrl.UpdateLicenseKey, JSON.stringify(body), {headers: header})
        .map(
            (response:Response)=>{
            return response.json();
            }
        ).catch(e=>{
            if (e.status === 401) {
                this.CallRedirectToLoginPage();
            }
            return Observable.throw(e);
        })
    }

    CallHeader() {
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken());
        return header;

    }

    CallRedirectToLoginPage()
    {
        this.router.navigateByUrl('/login');
    }

}