export class ChangePass {

  public OldPassword:string;
  public NewPassword:string;
  private ConfirmPassword: string;

  constructor(oldPassword:string,newPassword:string,confirmPassword:string)
  {
    this.OldPassword=oldPassword;
    this.NewPassword=newPassword;
    this.ConfirmPassword=confirmPassword;
  }
 }
 export class RootObject {
        NewPassword: string[];
        ConfirmPassword: string[];
    }