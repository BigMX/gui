import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

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
