import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { User } from '../../../modal/user.modal';
import { ERService } from '../../../shared/services/er-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  private sub: any;
  id : string;
  userName : string = "";
  usrEmail : string = "";
  setRole = "0";
  isEnabled : boolean;
  roleList = [{ID : 1, Name : 'Administrator' },{ID : 2, Name : 'User' }];
  popmessage = '';      
  showDialog = false;
  flagSave = false;
  error = false;
  gettingUserData = true;
  flagDisabled = true;

  constructor(public ServiceURL: ERService, public router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id =  params['id']; 
   });
   this. GetUserData();
  }

  onFormSubmit(form: NgForm) {
    this.flagSave = true;
    const usr = new User();
    usr.UserID = this.id;
    usr.Email = form.value.createUser.email;
    usr.RoleGroup = form.value.createUser.roleDD;
    usr.Enabled = form.value.createUser.userEnable;
    this.ServiceURL.UpdateUser(usr)
      .subscribe(
        (data) => {
          console.log('data:= ', data);
          this.popmessage=data;      
          this.showDialog=true;
          this.flagSave = false;
        },
        (error) => {
          const errorData = error.json();
          console.log('error:', errorData.Message);
          this.popmessage=errorData.Message; 
          this.error = true;
          this.flagSave = false;
  
      });
      
  }

  GetUserData(){
    this.ServiceURL.GetUserData(this.id)
    .subscribe(
    (data: User) => {
      this.userName = data.UserName; 
      this.setRole = data.RoleGroup;
      this.isEnabled = data.Enabled;
      this.usrEmail = data.Email;
      this.gettingUserData = false;
      this.flagDisabled = false;
    },
    (error) => {
      const errorData = error.json();
      console.log('error:', errorData);
      this.gettingUserData = false;
    });
  }

  onCancel(){
    this.router.navigate(['../list-users']);
  }

}
