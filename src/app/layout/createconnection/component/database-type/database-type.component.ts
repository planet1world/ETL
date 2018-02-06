import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-database-type',
  templateUrl: './database-type.component.html',
  styleUrls: ['./database-type.component.css']
})
export class DatabaseTypeComponent implements OnInit {

  showdb = false;
  showschema = false;
  constructor() { }

  ngOnInit() {
  }

}
