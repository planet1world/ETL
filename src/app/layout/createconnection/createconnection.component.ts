import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ERService } from '../../shared/services/er-service.service';
import { PropertyGroup, Property,TestConnection,SourceConnectionClass } from '../../modal';


@Component({
  selector: 'app-createconnection',
  templateUrl: './createconnection.component.html',
  styleUrls: ['./createconnection.component.scss']
})
export class CreateconnectionComponent implements OnInit {
  public testcon: TestConnection;
  public sourceconnectionobject: SourceConnectionClass;
  specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  connection_array = [];
  test_connection = [];
  schema = [];
  propertygroup: PropertyGroup[];
  propertyList: Property[];
  property: Property[];
  selpropertyGroup: number;
  connectionType = [];
  conEngineType = [];
  db = [];
  alerts = [];
  flocation = 'name';
  UN = 'User Name';
  Pass = 'Password';
  showcpg = false;
  showp = false;
  showconntype = false;
  showconnprovider = false;
  showtest = false;
  showdb = false;
  showschema = false;
  selectedfolder = false;
  selectedSource = false;
  showDatabase = true;
  showSchema = true;
  showconn = false;
  disabled = true;
  showDialog = false;
  save = false;
  dbversion: string;
  default = true;
  providerdisabled = true;
  selectedConnection = 2;
  SelectedConnectionType = 2;
  selectconnectionproviderid = 3;
  textareaLength = 30;
  status = '';
  selectedconnectionid = 2;
  selectedpgid = 1;
  selectedpid = 1;
  selectedconname = '';
  selectedcontypeid = 2;
  selectedconproviderid = 3;
  selectedservername = '';
  selectedusername = '';
  selectedpassword = '';
  selecteddatabase = '';
  selectedschema = ''
  selectedfolderlocation = '';
  popmessage = '';
  testcondition = false;


  @ViewChild('connProv') connProv;
  @ViewChild('conn') conn;
  @ViewChild('connType') connType;
  @ViewChild('selectPG') selectPG;
  @ViewChild('selectProperty') selectProperty;
  @ViewChild('databaseSelect') databaseSelect;
  @ViewChild('schemaSelect') schemaSelect;
  @ViewChild('f') ChangePasswordForm: NgForm;


  closeResult: string;
  constructor(public ServiceURL: ERService, public router: Router) {


  }

  ngOnInit() {
    this.getConnectionSource();
    this.getConnectionType();
    this.getConEngineType(2);
    this.getPropertyData();
    this.getActivePropertyGroup();
  }


  /* Event function*/

  onChangeConnection(connection: number) {
    if (connection == 2) {
      this.getConnectionType()
      this.SelectedConnectionType = 2;
      this.getConEngineType(2);
      this.selectedfolder = false;
      this.selectedSource = false;
      this.disabled = true;
      this.providerdisabled = true;
      this.UN = 'User Name';
      this.Pass = 'Password';
      this.showDatabase = true;
      this.showSchema = true;

    }
    else {
      this.selectedSource = true;
      this.disabled = false;
      this.providerdisabled = false;
    }

  }
  getPropertyData() {
    const obj = new Property();
    obj.Operation = 'GetInfo';
    this.ServiceURL.PropertyOperation(obj)
      .subscribe(
      (data: Property[]) => {
        this.propertyList = data;
        console.log(data);
        this.property = data;

      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);

      });
  }
  onChangePG(id: number) {
    this.selectedpgid = id;
    if (this.propertyList.length > 0) {
      if (id == 0)
        this.property = this.propertyList;
      else
        this.property = this.propertyList.filter(Property => Property.PropertyGroupID == id);
    }
  }

  onChangeConnectionType(id: number) {

    if (id != undefined) {
      if (id == 1) {
        this.selectedfolder = true;
        this.showDatabase = false;
        this.showSchema = false;
        this.UN = 'FTP UserName';
        this.Pass = 'FTP Password'
      }
      else {
        this.selectedfolder = false;
        this.UN = 'User Name';
        this.Pass = 'Password'
        this.showDatabase = true;
        this.showSchema = true;
      }
      console.log('id:', id);
      let _id = id.toString();
      this.getConEngineType(_id);
    }


  }
  onConnectionProviderChange(id: any) {

    this.showSchema = true;
    if (id == 2 || id == 1 || id == 4) {
      this.showSchema = false;
      console.log('id:', id);
    }

  }
  onChangeDB(database: string) {
    this.testcon = {
      provider: this.connProv.nativeElement.value,
      servername: this.selectedservername,
      username: this.selectedusername,
      password: this.selectedpassword,
      databasename: database

    }
    this.showschema = true;
    this.ServiceURL.getSchema(this.testcon)
      .subscribe(
      (data: any[]) => {
        this.schema = [];
        for (let sc of data) {
          this.schema.push(new DatabaseList(sc));
        };
        this.showschema = false;
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showschema = false;
      });


  }

  onTestConnection() {
    console.log('test');
    this.testcon = {
      provider: this.connProv.nativeElement.value,
      servername: this.selectedservername,
      username: this.selectedusername,
      password: this.selectedpassword,
      databasename: '',
    }

    let val = this.Valaditthefield();
    if (this.connProv.nativeElement.value == 2 || this.connProv.nativeElement.value == 3) {
      if (val) {
        this.showtest = true;
        this.ServiceURL.getTestConnection(this.testcon)
          .subscribe(
          (data: any[]) => {
            this.db = [];
            this.db.push(new DatabaseList("-Select a database-"));
            for (let dbname of data) {
              this.db.push(new DatabaseList(dbname.DB));
              this.dbversion = dbname.Version;
            };
            this.showtest = false;
            this.popmessage = 'Server connection successfully established'
            this.status = 'succes';
            this.showDialog = true;

          }
          ,
          (error) => {
            const errorData = error.json();
            console.log('error:', errorData);
            this.popmessage = 'Ops!! Server Connection Failed'
            this.showtest = false;
            this.status = 'error';
            this.showDialog = true;
          });
      }
      else {
        this.status = 'validation';
        this.showDialog = true;
        this.default = false;
      }

    } else {
      this.popmessage = 'OK';
      this.status = 'succes';
      this.showDialog = true;
    }
  }

  onDataSave() {
    let array = []
    let val = this.Valaditthefield();
    console.log(val);
    if (val) {
      /*Source*/
      if (this.conn.nativeElement.value == 1) {
        console.log(this.selectProperty.nativeElement.value);
        this.selectedpid = this.selectProperty.nativeElement.value;
        if (this.connType.nativeElement.value == 1) {
          this.selectedschema = '';
          this.selecteddatabase = '';
        }
        else if (this.connType.nativeElement.value == 2) {
          if (this.connProv.nativeElement.value == 2) {
            this.selectedschema = '';
            this.selecteddatabase = this.databaseSelect.nativeElement.value;
          }
          else {
            this.selectedschema = this.schemaSelect.nativeElement.value
            this.selecteddatabase = this.databaseSelect.nativeElement.value;
          }
        }

      }
      else {
        this.selectedpid = 0;
        this.selecteddatabase = this.databaseSelect.nativeElement.value;
        if (this.connProv.nativeElement.value == 2) {
          this.selectedschema = '';
        }
        else {
          this.selectedschema = this.schemaSelect.nativeElement.value
        }
      }

      this.sourceconnectionobject = {
        connectionid: this.conn.nativeElement.value,
        propertygroupid: this.selectPG.nativeElement.value,
        propetyid: this.selectedpid,
        connectionname: this.selectedconname,
        connectiontypeid: this.connType.nativeElement.value,
        connectionproviderid: this.connProv.nativeElement.value,
        servername: this.selectedservername,
        username: this.selectedusername,
        password: this.selectedpassword,
        databasename: this.selecteddatabase,
        databaseversion: this.dbversion,
        schema: this.selectedschema,
        folderlocation: this.selectedfolderlocation,
        requestinfo:'Insert'
      }

      this.save = true;
      this.ServiceURL.postNewConnectionData(this.sourceconnectionobject)
        .subscribe(
        (data: any) => {
          this.Reset();
          this.router.navigate(['../connectionmanager']);

        }
        ,
        (error) => {
          const errorData = error.json();
          this.save = false;
          console.log('error:', errorData);
          this.popmessage = errorData.Message;
          this.status = 'error';
          this.showDialog = true;
        });
    }
    else {
      this.save = false;
      this.status = 'validation';
      this.showDialog = true;
      this.default = false;
    }


  }
  onClear() {
    this.Reset();
  }

  getActivePropertyGroup() {
    const obj = new PropertyGroup();
    obj.Operation = 'GetRecordsByStatus';
    obj.Active = 1;
    this.showcpg = true;

    this.ServiceURL.CreatePropertyGroup(obj)
      .subscribe(
      (data: PropertyGroup[]) => {
        this.propertygroup = data;
        let selectpush = new PropertyGroup();
        selectpush.ID = 0;
        selectpush.Name = 'Select Property Group';
        this.propertygroup.push(selectpush);
        this.selpropertyGroup = 0;
        this.showcpg = false;
      },
      (error) => {

        const errorData = error.json();
        console.log('error:', errorData);
        this.showcpg = false;

      });


  }
  onChangeProperty(parm: any) {

  }


  public Reset() {
    this.selectedconname = '';
    this.selectedservername = '';
    this.selectedusername = '';
    this.selectedpassword = '';
    this.selecteddatabase = '';
    this.selectedschema = ''
    this.selectedfolderlocation = '';
  }
  onChange(event) {
    // debugger;
    let fileList: FileList = event.target.files;

    let file: File = fileList[0];
    console.log(file);
    var files = event.srcElement.files;
    this.flocation = files;
    console.log(files);
  }
  Valaditthefield(): boolean {
    let val = [];
 if (this.selectPG.nativeElement.value == 0 )
      val.push({ message: 'Please select Property Group' });

    if (this.checkForSpecialChar(this.selectedconname)) {
      val.push({ message: 'Special characters like !@#$%^&*.,<>/\'";:? Not allowed' });
    }
    if (this.selectedconname == undefined || this.selectedconname == '')
      val.push({ message: 'Please enter the Connection Name' });

    if (this.selectedservername == undefined || this.selectedservername == '')
      val.push({ message: 'Please enter the Server IP' });

    if (this.selectedusername == undefined || this.selectedusername == '')
      val.push({ message: 'Please enter the User Name' });

    if (this.selectedpassword == undefined || this.selectedpassword == '')
      val.push({ message: 'Please enter the Password' });

    if (this.connType.nativeElement.value == 1) {
      if (this.selectedfolderlocation == undefined || this.selectedfolderlocation == '')
        val.push({ message: 'Please enter the Folder Location' });
    }



    let i = 0;
    this.alerts = [];
    for (let arr of val) {
      i = i + 1;
      this.alerts.push({
        id: 1,
        type: 'danger',
        message: arr.message,
      });
    }
    if (i > 0)
      return false;
    else
      return true;

  }
  /* Calling get service function*/

  getConnectionSource() {
    this.showconn = true;
    this.ServiceURL.getConnection()
      .subscribe(
      (data: any[]) => {
        console.log('ConnectionSource');
        this.connection_array = [];

        for (let dataconnection of data) {
          this.connection_array.push(new ConnectionList(dataconnection.ID, dataconnection.Name));
        };
        this.showconn = false;
        console.log(this.connection_array);
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showconn = false;
      });



  }
  getConnectionType() {
    this.showconntype = true;
    this.ServiceURL.getConnectionType()
      .subscribe(
      (data: any[]) => {
        console.log('ConnectionType');
        this.connectionType = [];
        for (let val of data) {
          this.connectionType.push(new ConnectionTypeList(val.ID, val.Name));
        }
        this.showconntype = false;
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showconntype = false;
      });
  }
  getConEngineType(id: any) {
    this.showconnprovider = true;
    this.ServiceURL.getConEngineType(id)
      .subscribe(
      (data: any[]) => {
        console.log('ConEngineType');
        this.conEngineType = [];
        for (let val of data) {
          this.conEngineType.push(new conEngineTypeList(val.ID, val.Name));
        }
        this.showconnprovider = false;
        console.log(this.conEngineType);
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showconnprovider = false;
      });
  }
  checkForSpecialChar(value: string): boolean {
    for (let i = 0; i < this.specialChars.length; i++) {
      if (value.indexOf(this.specialChars[i]) > -1) {
        return true
      }
    }
    return false;
  }
}

export class ConnectionList {
  constructor(public id: number, public name: string) { }
}
export class ConnectionTypeList {
  constructor(public id: number, public name: string) { }
}

export class conEngineTypeList {
  constructor(public id: any, public name: string) { }
}
export class propertygroupList {
  constructor(public id: any, public name: string) { }
}
export class propertyList {
  constructor(public id: any, public name: string) { }
}
export class DatabaseList {
  constructor(public db: string) { }
}
