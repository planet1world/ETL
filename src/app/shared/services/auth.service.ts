import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { servicelist } from '../../services/servicelist';
import { Config } from '../../modal/config-modal.modal';
import { CookieService } from 'ng2-cookies';


@Injectable()
export class AuthService {
  token: string;
  userName: string;
  version: string;
  loginurl: string;
  configurationobject: Config;
  checkName: string = "ER_ETL_V";
  cookies: Object;


  constructor(private http: Http, private serviceURL: servicelist, public cookieService: CookieService) {

  }
  singinUser(username: string, password: string, lang: string) {

    let body = `username=${username}&password=${password}&grant_type=password`;

    const header = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.serviceURL.loginServiceURL, body, { headers: header })
      .map(
      (response: Response) => {
        const data = response.json();
        console.log(data);
        this.token = data.access_token;

        localStorage.setItem('User', data.userName);
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('expires', data[".expires"]);
        localStorage.setItem('lang', lang);
        return data;
      }
      );
  }

  signOut() {

    localStorage.removeItem('User');
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('lang');
    localStorage.clear();
    this.userName = null;
    this.token = null;
  }
  getCheckVersion() {
    if (this.cookieService.check(this.checkName)) {
      this.cookies = this.cookieService.get(this.checkName);
      this.getConfig()
        .subscribe(
        (data: Config) => {
          console.log(data);
          this.configurationobject = data;
          if (this.cookies != this.configurationobject.Version) {
             console.log(this.cookies);
             console.log(this.configurationobject.Version);
            return true;
          }else{
             return false;
          }

        });
    }
    // return false;
  }
  storeNewCookie() {
    this.getConfig()
      .subscribe(
      (data: Config) => {
        console.log(data);
        this.configurationobject = data;
        console.log('N:',this.configurationobject.Version);
        this.cookieService.set(this.checkName, this.configurationobject.Version, 360);

      });
  }

  private getVersion(versionNo: Object) {

    this.getConfig()
      .subscribe(
      (data: Config) => {
        console.log(data);
        this.configurationobject = data;
        return this.version = this.configurationobject.Version;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);

      });

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
  getUseName() {
    this.userName = localStorage.getItem('User');
    return this.userName;
  }
  getToken() {
    this.token = localStorage.getItem('token');
    return this.token;
  }

  isAuthenticated() {
    const now = new Date();
    // console.log(new Date(localStorage.getItem('expires')));
    // console.log( new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds()));


    if (new Date(localStorage.getItem('expires')) >= new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds())) {
    //  console.log( localStorage.getItem('token') != null);
      return localStorage.getItem('token') != null;
    }
    return false;

  }

  changePassword(changePasswordParameter: any) {
    let body = changePasswordParameter;
    const header = new Headers();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', 'Bearer ' + this.getToken())
    return this.http.post(this.serviceURL.changePasswordServiceURL, JSON.stringify(body), { headers: header })
      .map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
      );

  }

  statusUpdate(status: string)
  { }

}
