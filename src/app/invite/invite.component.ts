import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  registry: Registry[];
  newRegistry: Registry;

  constructor() { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registry = [];
  }

  addRegistry() {
    this.registry.push(this.newRegistry);
    this.newRegistry = new Registry;
  }
}
