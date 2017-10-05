import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from 'ng2-translate';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private subscription: Subscription;
    constructor(public router: Router, private translate: TranslateService, private activatedRoute: ActivatedRoute) {
        this.translate.use(localStorage.getItem('lang'));
     }
    ngOnInit() {
        // this.translate.addLangs(["en", "fr", "cn", "hi"]);

        // let browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|cn|hi/) ? browserLang : 'en');
      
        this.subscription = this.activatedRoute.queryParams.subscribe(
            (param: any) => {
                let locale = param['locale'];
                if (locale !== undefined) {
                    this.translate.use(locale);
                }
            });
        // this.router.navigate(['/login']);
    }
}
