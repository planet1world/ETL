import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ChangePass, RootObject } from './changepassword.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from '../../layout/bs-component/components';
import { Alertlist } from '../../services/alertlistservice';
import { TranslateModule, TranslateService } from 'ng2-translate';
import { LayoutComponent } from '../../layout/layout.component';





@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss'],

})
export class ChangepasswordComponent implements OnInit {
  alerts: Array<any> = [];
  default = true;
  @ViewChild('f') ChangePasswordForm: NgForm;
  constructor(public ServiceURL: AuthService, private alert: Alertlist, public translate: TranslateService) {
    this.translate.use(localStorage.getItem('lang'));

  }

  ngOnInit() {
  }
  public closeAlert(alert: any) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  onChangepassword(form: NgForm) {
    const value = form.value
    const changepassObject: ChangePass =
      new ChangePass(value.oldpass,
        value.password, value.confirmPassword)
      ;


    this.ServiceURL.changePassword(changepassObject)
      .subscribe(
      (data: any) => {
        console.log('data:', data);
        this.alerts = [];
        this.default = false;
        this.alerts.push({
          id: 1,
          type: 'success',
          message: this.alert.getalertString(localStorage.getItem('lang'), data.message),
        });
      },
      (error) => {
        this.alerts = [];
        this.default = false;
        const errorData = error.json().ModelState;
        let i = 0;
        Object.keys(errorData).forEach(key => {
          let value = errorData[key];
          i = i + 1;
          this.alerts.push({
            id: i,
            type: 'danger',
            message: this.alert.getalertString(localStorage.getItem('lang'), value[0]),
          });


        });


        console.log('error:', JSON.stringify(errorData));
      }
      );
    form.reset();
  }
  onClear() {
    this.ChangePasswordForm.reset();
  }

}
