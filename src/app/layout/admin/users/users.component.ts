import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyGroup, Property } from '../../../modal/propertygroup-modal.modal';
import { ERService } from '../../../shared/services/er-service.service';
import { User } from '../../../modal/user.modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  flagSave = false;
  usersList : User[];
  loadList = true;
  selectedUserId : string = "";
  warning = false;
  flagResetPwd = "false";
  popmessage = "";
  showDialog = false;
  error = false;
  // [{ID : 1, UserName : 'Ome', RoleGroup:'Admin', Enabled:false },{ID : 2, UserName : 'Two', RoleGroup:'Admin', Enabled:true },
  //               {ID : 3, UserName : 'Administrator', RoleGroup:'user', Enabled:true },{ID : 4, UserName : 'user', RoleGroup:'Admin', Enabled:false }];
  
  constructor(public ServiceURL: ERService, public router: Router) {

  }

  ngOnInit() {
    this.GetUsersList();
  }

  onAddNewUser(){
    this.router.navigate(['../create-user']);
  }

  GetUsersList(){
    this.ServiceURL.GetUsersList()
    .subscribe(
    (data: User[]) => {
      this.usersList = data;
      this.loadList = false;
    },
    (error) => {
      const errorData = error.json();
      this.loadList = false;
    });
  }

  onEditUser(userid : string){
    this.router.navigate(['../edit-user', userid]);
  }

  onResetPassword(userid : string){
    this.selectedUserId = userid;
    this.warning = true;

  }

  onResetConfirmation() {
    this.flagResetPwd = this.selectedUserId;
    this.warning = false;
    this.ServiceURL.ResetUserPassword(this.selectedUserId)
      .subscribe(
      (data: any) => {
        this.popmessage=data;      
        this.showDialog=true;
        this.warning = false;
        this.flagResetPwd = "false";
      },
      (error) => {
        const errorData = error.json();
        this.popmessage=errorData.Message; 
        this.error = true;
        this.warning = false;
        this.flagResetPwd = "false";
        console.log('error:', errorData.Message);
      });
  }
  
  onNo() {
    this.warning = false;
  }


}
