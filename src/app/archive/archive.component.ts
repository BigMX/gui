import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

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

