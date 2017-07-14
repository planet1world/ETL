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
}
