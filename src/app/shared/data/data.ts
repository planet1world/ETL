import { Injectable } from '@angular/core';
import {Product,Job} from '../../modal'
 
@Injectable()
export class Data { 
    public storage: any; 
    public selectedproduct:Product[];
    public selectedtablelist:any[];
    public templateconnectionstring:string;
    public SchemaId:number;
    public EditProduct:boolean;
    public viewProductSummary:boolean;
    public selectedJob:Job;
    public constructor() { } 
}
// @Injectable()
// export class