import { Injectable } from '@angular/core';
import {Product} from '../../modal/product.modal'
 
@Injectable()
export class Data { 
    public storage: any; 
    public selectedproduct:Product[];
    public selectedtablelist:any[];
    public templateconnectionstring:string;
    public SchemaId:number;
    public EditProduct:boolean;
    public viewProductSummary:boolean;
    public constructor() { } 
}
// @Injectable()
// export class