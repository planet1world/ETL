import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { User } from '../../../modal/user.modal';
import { ERService } from '../../../shared/services/er-service.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  showDialog=false;
  error = false;
  popmessage='';
  flagSave = false;
  username : string;
  password : string;
  setRole = 0; 
  isEnabled = true;
  show = true;
  pgList = [];
  propList : Property[] =[]; 
  setPG = 0;
  messageShow = 'Show Advanced Details';
  roleList = [{ID : 1, Name : 'Administrator' },{ID : 2, Name : 'User' }];

  constructor(public ServiceURL: ERService, public router: Router, private route: ActivatedRoute) {

  }

  id: number;
  private sub: any;

  ngOnInit() {
    this.getPropertyData();  
  }
  
  getPropertyData() {
    const obj = new Property();
    obj.Operation = 'GetInfo';
    this.ServiceURL.PropertyOperation(obj)
      .subscribe(
      (data: Property[]) => {
        this.propList = data;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
      });
  }

  onFormSubmit(form: NgForm) {
    this.flagSave = true;
    const usr = new User();
    usr.UserName = form.value.createUser.username;
    usr.Password = form.value.createUser.password;
    usr.ConfirmPassword = form.value.createUser.password;
    usr.Email = form.value.createUser.email;
    usr.RoleGroup = form.value.createUser.roleDD;
    usr.Enabled = form.value.createUser.userEnable;
    this.ServiceURL.CreateUser(usr)
      .subscribe(
        (data) => {
          console.log('data:= ', data);
          this.popmessage=data;      
          this.showDialog=true;
          this.flagSave = false;
          form.reset();  
        },
        (error) => {
          const errorData = error.json();
          console.log('error:', errorData.Message);
          this.popmessage=errorData.Message; 
          this.error = true;
          this.flagSave = false;
  
      });
      
  }

  onShowAdvancedDetails(){
    if(this.show){
    this.show = false;
    this. messageShow = 'Hide Advanced Details';
    }
    else{
    this.show =true;
    this. messageShow = 'Show Advanced Details';
    }
  }
  onCancel(){
    this.router.navigate(['../list-users']);
  }

}
  
