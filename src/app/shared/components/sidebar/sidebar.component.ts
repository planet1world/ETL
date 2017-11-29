import { Component } from '@angular/core';
import * as appV from '../../../version';
import { CookieService } from 'ng2-cookies';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isActive = false;
    showMenu = '';
    showJobMenu = '';
    showEtlMenu = '';
    version: string;
    checkName: string = "ER_ETL_V";
    constructor(public cookieService: CookieService) {
        this.version = this.cookieService.get(this.checkName);;
    }
    eventCalled() {
        this.isActive = !this.isActive;
    }
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
    addExpandJobClass(element: any) {
        if (element === this.showJobMenu) {
            this.showJobMenu = '0';
        } else {
            this.showJobMenu = element;
        }
    }
    addExpandETLTracking(element: any) 
    {
        if (element === this.showEtlMenu) {
            this.showEtlMenu = '0';
            console.log('this.showEtlMenu 1:= ' + this.showEtlMenu);
        } else {
            this.showEtlMenu = element;
            console.log('this.showEtlMenu 2:= ' + this.showEtlMenu);
        }
    }
}
