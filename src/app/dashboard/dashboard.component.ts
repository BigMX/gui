import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDialogService, SimpleModalComponent } from 'ngx-modal-dialog';
import { Registry} from '../class/registry';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;

  constructor() {}


  ngOnInit() {
    this.newRegistry=new Registry;
    this.registry=[];
  }
  addRegistry() {
    this.registry.push(this.newRegistry);
    this.newRegistry=new Registry;
  }
}
