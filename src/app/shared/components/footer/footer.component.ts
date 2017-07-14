import { Component, OnInit } from '@angular/core';
import * as appV from '../../../version';
import { AuthService } from '../../../shared/services/auth.service';
import { CookieService } from 'ng2-cookies';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  version: string;
  checkName: string = "ER_ETL_V";

  constructor(public loginService: AuthService, public cookieService: CookieService) {
    this.version = this.cookieService.get(this.checkName);

  }

  ngOnInit() {
  }

}
