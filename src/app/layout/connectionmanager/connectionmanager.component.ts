import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ERService } from '../../shared/services/er-service.service';

@Component({
  selector: 'app-connectionmanager',
  templateUrl: './connectionmanager.component.html',
  styleUrls: ['./connectionmanager.component.scss']
})
export class ConnectionmanagerComponent implements OnInit {
  source = [];
  destination = [];
  showDialog = false;
  status = '';
  showsource = true;
  showdestination = true;
  deleteId: number;
  selectedfunction: number;
   filterSource='';
  constructor(public router: Router, public ServiceURL: ERService) {

  }

  ngOnInit() {
    this.getConnectionDestination();
    this.getConnectionSource();
  }

  onDelete(id: any, choice: number) {

    this.selectedfunction = choice;
    this.deleteId = id;
    this.status = 'error';
    this.showDialog = true;
  }
  onDeleteConfirmation() {
    this.showDialog = false;
    this.showsource = true;
    this.ServiceURL.DeleteConnection(this.deleteId)
      .subscribe(
      (data: any[]) => {
        this.showsource = false;
        if (this.selectedfunction == 1)
          this.getConnectionSource();
        else
          this.getConnectionDestination();
      }
      ,
      (error) => {
        const errorData = error.json();
        console.log('error:', errorData);
        this.showsource = false;
      });
  }
  getConnectionSource() {
    this.ServiceURL.getConectionList(1)
      .subscribe(
      (data: any[]) => {
        this.source = [];
        for (let val of data) {
          this.source.push(new Connection(val.ID, val.Name, val.ProviderId));
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
          this.destination.push(new Connection(val.ID, val.Name, val.ProviderId));
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



}
export class Connection {
  constructor(public id: any, public name: string, public provider: number) { }
}
