import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { servicelist } from '../../services/servicelist';
// import { PropertyGroup, Property } from '../../modal/propertygroup-modal.modal';
import { ConnectionClass, PropertyGroup, Property, Product, Template, ProductTable, ProductTableStructure } from '../../modal';
// import { Product, Template, ProductTable, ProductTableStructure } from '../../modal/product.modal';
@Injectable()
export class ERService {
    token: string;
    userName: string;
    loginurl: string;
    constructor(private http: Http, private serviceUrl: servicelist) {

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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
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
            );
    }


    AutoSelectforTable(connectionstring: string, tablelname: any[], productid: string, propertyid: string, schemaid: string) {


        let body = { 'tblst': tablelname, 'templateDBconString': connectionstring, 'productid': Number(productid), 'propertyid': Number(propertyid), 'schemaid': Number(schemaid) }
        console.log(body);
        const header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Authorization', 'Bearer ' + this.getToken())

        return this.http.post(this.serviceUrl.AutoSelection, JSON.stringify(body), { headers: header })
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            );
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
            );
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
            );
    }
}