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
            console.log('this.showJobMenu 1:= ' + this.showJobMenu);
        } else {
            this.showJobMenu = element;
            console.log('this.showJobMenu 2:= ' + this.showJobMenu);
        }
    }
}
