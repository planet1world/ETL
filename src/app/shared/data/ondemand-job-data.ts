import { Injectable } from '@angular/core';
import {Product,Job,PropertyGroup,Property} from '../../modal'
 
@Injectable()
export class OndemandJobData { 
    public Isback:boolean;
    public selectedJob:Job;
    PropertyGroup: PropertyGroup[];
    Property: Property[];
    Product : Product[];
    Job : Job[];
    public constructor() { } 
}