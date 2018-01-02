import { Component, OnInit, ViewChild } from '@angular/core';
import { Login } from './login.model';
import { NgForm } from '@angular/forms';
import { Response, Http } from '@angular/http';
import { AuthService } from '../shared/services/auth.service';
 
import { Router } from '@angular/router';
import { TranslateService, TranslateModule } from 'ng2-translate';
import { Alertlist } from '../services/alertlistservice';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as appV from '../version';
import { CookieService } from 'ng2-cookies';
import { Config } from '../modal/config-modal.modal';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    default = true;
    error_description: string;
    version: string;
    browserLang: string;
    alerts: Array<any> = [];
    selectedCountry: langList;
    cookies: Object;
    configurationobject: Config;

    keys: Array<string>;
    cName: string;
    cValue: string;
    rName: string;
    showlogin = false;
    checkName: string = "ER_ETL_V";
    languages = [
        new langList('fr', 'French'),
        new langList('en', 'English'),
        new langList('cn', 'Chinese'),
        new langList('hi', 'Hindi')
    ];

    popmessage='';
    popemail ='';
    popemailmsg = '';
    showDialog=false;

    @ViewChild('f') LoginForm: NgForm;
    constructor(private http: Http, public loginService: AuthService, public router: Router, public translate: TranslateService, private alert: Alertlist,
        public cookieService: CookieService) {

        this.translate.addLangs(["en", "fr", "cn", "hi"]);
        this.browserLang = this.translate.getBrowserLang();
        this.translate.use(this.browserLang);

    }

    ngOnInit() {
        this.checkVersion();


    }

    getConfig() {
        return this.http.get("./assets/config/config.json")
            .map(
            (response: Response) => {
                const data = response.json();
                return data;
            }
            );
    }
    checkVersion() {
        if (this.cookieService.check(this.checkName)) {
            this.cookies = this.cookieService.get(this.checkName);
            this.getConfig()
                .subscribe(
                (data: Config) => {
                    this.configurationobject = data;
                    this.version = this.cookieService.get(this.checkName);
                    if (this.cookies != this.configurationobject.Version) {
                        this.alerts = [];
                        this.alerts.push({
                            id: 1,
                            type: 'warning',
                            message: "New version " + this.configurationobject.Version + " Available.Please clear the cache/cookies and Reload it. ",
                        });
                    }

                });
        }
        else {

            this.getConfig()
                .subscribe(
                (data: Config) => {
                    this.configurationobject = data;
                    this.version = this.configurationobject.Version;
                    this.cookieService.set(this.checkName, this.configurationobject.Version, 360);
                });

        }
    }
    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
    // onSignIn(form: NgForm) {
    //     const user = form.value.username;
    //     const pass = form.value.password;
    //     console.log(user);
    //     console.log(form);

    // }

    onSignIn() {
        this.showlogin = true;
        const user = this.LoginForm.value.username;
        const pass = this.LoginForm.value.pass;

        // this.token = localStorage.getItem('token'); 
        //   console.log(this.token );  

        this.loginService.singinUser(user, pass, this.browserLang)
            .subscribe(
            (data: any) => {
                this.showlogin = false;
                this.router.navigate(['../dashboard']);
            },
            (error) => {
                this.showlogin = false;
                console.log(error);
                const errorData = error.json();
                this.default = false;
                this.error_description = this.alert.getalertString(this.browserLang, errorData.error_description);
                this.alerts = [];
                this.default = false;
                this.alerts.push({
                    id: 1,
                    type: 'danger',
                    message: this.error_description,
                });
                console.log('error:', errorData.error_description);
            }
            );
    }

    changeLanguage(lang: any) {
        this.browserLang = lang;
        this.translate.use(lang);
    }

    onForgotPassword()
    {
        this.loginService.forgotPassword()
        .subscribe(
        (data: string[]) => {
            this.showDialog = true;
            console.log(data);
            this.popmessage = data[0]
            this.popemail = "mailto:"+data[1];
            this.popemailmsg = data[1];
        },
        (error) => {
            const errorData = error.json();
            console.log('error:', errorData.error_description);
        }
        );
    }

    onClosePopup()
    {
        this.showDialog = false;
    }

}
export class langList {
    constructor(public id: string, public name: string) { }
}
