import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { TranslateModule } from 'ng2-translate';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    userName: string;
    visible = false;
    constructor(public service: AuthService, public router: Router) {
        
        if (!service.isAuthenticated())
            this.router.navigate(['./login']);

        this.userName = service.getUseName();
    }
    ngOnInit() { }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('push-right');
    }
    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }
    
    onlogOut() {
        this.visible = true;
    }

    onNo()
    {
        this.visible = false;
    }

    onLogoutConfirm()
    {
        this.service.signOut();
        console.log('logout');
        this.router.navigate(['./login']);
    }

    close()
    {
        this.visible = false;
    }
}
