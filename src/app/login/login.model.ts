export class Login {

  public username:string;
  public password:string;
  private grant_type: string;

  constructor(userName:string,passWord:string,grantType:string)
  {
    this.username=userName;
    this.password=passWord;
    this.grant_type=grantType;
  }
 }