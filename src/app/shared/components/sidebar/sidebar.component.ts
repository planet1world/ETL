import { Component } from '@angular/core';
import * as appV from '../../../version';
import { CookieService } from 'ng2-cookies';
import { AuthService } from '../../../shared/services/auth.service';

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
    showAdminMenu = '';
    isAdministrator = false;
    version: string;
    checkName: string = "ER_ETL_V";
    downloadUrl : string;
    constructor(public cookieService: CookieService, private authService : AuthService) {
        this.version = this.cookieService.get(this.checkName);
        this.isAdministrator = this.authService.isAdministrator();
        this.downloadUrl = this.authService.DownloadExtractToolUrl();
        console.log('this.downloadUrl: ' + this.downloadUrl);

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
        } else {
            this.showEtlMenu = element;
        }
    }
    
    addAdminConsole(element: any) 
    {
        if (element === this.showAdminMenu) {
            this.showAdminMenu = '0';
        } else {
            this.showAdminMenu = element;
        }
    }
}
