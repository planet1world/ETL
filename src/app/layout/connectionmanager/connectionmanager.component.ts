import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ERService } from '../../shared/services/er-service.service';
import { ConnectionClass, TestConnection, SourceConnectionClass } from '../../modal'
import { OndemandJobData } from '../../shared/data/ondemand-job-data';

@Component({
  selector: 'app-connectionmanager',
  templateUrl: './connectionmanager.component.html',
  styleUrls: ['./connectionmanager.component.scss']
})
export class ConnectionmanagerComponent implements OnInit {
  testcon: TestConnection;
  updateConnectionObject: SourceConnectionClass;
  alerts: Array<any> = [];
  source = [];
  destination = [];
  textareaLength = 30;
  editObjectID: number;
  edittypeID: number;
  showDialog = false;
  showtest = false;
  selectedpassword = ''
  status = '';
  showsource = true;
  showdestination = true;
  deleteId: number;
  selectedfunction: number;
  filterSource = '';
  viewConnection = false;
  objConnectionView = new ConnectionClass();
  UN = '';
  Pass = '';
  ServerName = '';
  folderlocation='';
  showDatabase = false;
  showSchema = false;
  isfolderflag = false;
  selectedSource = false;
  editConnection = false;
  showTestDialog = false;
  popmessage = '';
  showlocate = false;
  save = false;
  constructor(public router: Router, public ServiceURL: ERService, private ondemandJobData : OndemandJobData) {
    this.ondemandJobData.Isback = null;

  }

  ngOnInit() {
    this.getConnectionDestination();
    this.getConnectionSource();
  }
  NO() {
    this.showDialog = false;
  }
  onDelete(id: any, choice: number) {

    this.selectedfunction = choice;
    this.deleteId = id;
    this.status = 'error';
    this.showDialog = true;
  }
  onEdit(id: number, choice: number, provider: number) {
    this.editObjectID = id;
    this.edittypeID = choice;
    this.showSchema = false;
    this.showDatabase = false;
    this.selectedpassword='';
    if (provider == 1 || provider == 4) {
      this.UN = 'FTP User Name';
      this.Pass = 'FTP Password';
      this.ServerName = 'FTP Server Name';
      this.isfolderflag=true;
    }
    else {
      this.UN = 'User Name';
      this.Pass = 'Password';
      this.ServerName = 'Server Name'
      this.isfolderflag=false;
    }
    this.ServiceURL.getConnectionView(id, choice)
      .subscribe(
      (data: ConnectionClass) => {
        this.objConnectionView = data;

        this.editConnection = true;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
      }
      );

  }

  onView(id: number, choice: number, provider: number) {
    this.showSchema = false;
    this.showDatabase = false;
    if (provider == 1 || provider == 4) {
      this.UN = 'FTP User Name';
      this.Pass = 'FTP Password';
      this.ServerName = 'FTP Server Name';
      this.isfolderflag= true;
    }

    else {
      this.UN = 'User Name';
      this.Pass = 'Password';
      this.ServerName = 'Server Name'
      this.isfolderflag = false;
    }
    this.ServiceURL.getConnectionView(id, choice)
      .subscribe(
      (data: ConnectionClass) => {
        this.objConnectionView = data;
        if (choice == 2) {

          this.showDatabase = true;
          this.showSchema = true;
          this.selectedSource = false;
        }
        else {
          this.selectedSource = true;
        }
        this.viewConnection = true;
      },
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
      }
      );
  }

  onTestConnection() {

    this.showtest = true;
    this.testcon = {
      provider: this.objConnectionView.ConnectionProviderID,
      servername: this.objConnectionView.ServerName,
      username: this.objConnectionView.UserName,
      password: this.selectedpassword,
      databasename: '',
    }

    this.ServiceURL.getTestConnection(this.testcon)
      .subscribe(
      (data: any[]) => {

        for (let dbname of data) {

          this.objConnectionView.Version = dbname.Version;
        };
        this.showtest = false;
        this.popmessage = 'Server connection successfully established'
        this.status = 'succes';
        this.showTestDialog = true;

      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.popmessage = 'Ops!! Server Connection Failed'
        this.showtest = false;
        this.status = 'error';
        this.showTestDialog = true;
      });

  }

  onEditClose() {
    this.editConnection = false;
  }
  onCloseEdit()
  {
    console.log('click');
           this.showTestDialog = false;
            this.editConnection = false;
  }
  onUpdate() {
    console.log(this.objConnectionView.ConnectionName);
    if(this.isfolderflag && this.objConnectionView.Folderlocation == '')
    {
      this.popmessage = 'Folder location required';
      this.status = 'error';
      this.showTestDialog = true;
    }
    else if( (!this.isfolderflag) && (this.selectedpassword == '' || this.objConnectionView.UserName =='' || this.objConnectionView.ConnectionName ==''))
    {
      this.popmessage = 'Connection Name/User Name/Password required';
      this.status = 'error';
      this.showTestDialog = true;
    }
    else
    {
      this.updateConnectionObject = {
        connectionid: this.editObjectID,
        propertygroupid: 0,
        propetyid: 0,
        connectionname: this.objConnectionView.ConnectionName,
        connectiontypeid: 0,
        connectionproviderid: this.objConnectionView.ConnectionProviderID,
        servername: this.objConnectionView.ServerName,
        username: this.objConnectionView.UserName,
        password: this.selectedpassword,
        databasename: this.objConnectionView.Database,
        databaseversion: this.objConnectionView.Version,
        schema: '',
        folderlocation: this.objConnectionView.Folderlocation,
        requestinfo: 'UpdateRecord'
      }
      this.save = true;
      this.ServiceURL.postNewConnectionData(this.updateConnectionObject)
        .subscribe(
        (data: any) => {
          this.save = false;
          this.popmessage = data;
          this.status = 'OK';
          this.showTestDialog = true;
          if (this.edittypeID == 1) {
            this.getConnectionSource();
           
          } else {
            this.getConnectionDestination();
          
          }
        }
        ,
        (error) => {
          const errorData = error.json();
          this.save = false;
          console.log('error:', errorData);
          this.popmessage = errorData.Message;
          this.status = 'error';
          this.showTestDialog = true;
        });
    }
  }

  onDeleteConfirmation() {
    this.showDialog = false;
    this.showsource = true;
    this.ServiceURL.DeleteConnection(this.deleteId)
      .subscribe(
      (data: any) => {
        this.showsource = false;
        this.status = 'succes';
        this.showDialog = true;
        this.popmessage = data;
        if (this.selectedfunction == 1)
          this.getConnectionSource();
        else
          this.getConnectionDestination();
      }
      ,
      (error) => {
        this.alerts = [];
        const errorData = error.json().ModelState;
        Object.keys(errorData).forEach(key => {
          let value = errorData[key];
          this.alerts.push({
            message: value[0],
          });
        });
        this.status = 'validation';
        this.showDialog = true;
        this.showsource = false;
      });
  }
  getConnectionSource() {
    this.ServiceURL.getConectionList(1)
      .subscribe(
      (data: any[]) => {
        this.source = [];
        for (let val of data) {
          this.source.push(new Connection(val.ID, val.Name, val.ProviderId, val.PropertyGroupName, val.PropertyName));
        }
        this.showsource = false;
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showsource = false;
      });
  }

  getConnectionDestination() {
    this.ServiceURL.getConectionList(2)
      .subscribe(
      (data: any[]) => {
        this.destination = [];
        for (let val of data) {
          this.destination.push(new Connection(val.ID, val.Name, val.ProviderId, val.PropertyGroupName, val.PropertyName));
        }
        console.log(this.destination);
        this.showdestination = false;
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showdestination = false;
      });
  }


  addNewConnection() {
    console.log('add conection');
    this.router.navigate(['../createconnection']);
  }
  onLocateDirectory()
  {
    if(this.isfolderflag && this.objConnectionView.Folderlocation == '')
    {
      this.popmessage = 'Folder location required';
      this.status = 'error';
      this.showTestDialog = true;
    }
    else
    {
    this.showlocate = true;
    this.ServiceURL.getDirectoryStatus(this.objConnectionView.Folderlocation)
      .subscribe(
      (data: any) => {
        console.log("data : " + data);
        this.popmessage = 'Directory  exists.'
        this.showlocate = false;
        this.status = 'succes';
        this.showTestDialog = true;
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.popmessage = 'Directory does not exist, you can still save and continue. Kindly ask administrator to create directory.'
        this.showlocate = false;
        this.status = 'error';
        this.showTestDialog = true;
      });
    }
  }


}
export class Connection {
  constructor(public id: any, public name: string, public provider: number, public propertyGroupName : string, public propertyName : string) { }
}
