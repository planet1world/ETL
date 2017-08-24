import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';
@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    constructor(public router: Router,private translate: TranslateService) {
         this.translate.use(localStorage.getItem('lang'));
     }
    ngOnInit() {
        
        if (this.router.url === '/') {
            this.router.navigate(['/dashboard']);
        }
    }
}
