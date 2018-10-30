import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;
  userId = 2;

  constructor(
    private registries: Registries
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registries.getRegistries(this.userId).subscribe((registry) => {
      this.registry = registry;
    });
  }

  addRegistry() {
    this.registry.push(this.newRegistry);
    this.newRegistry = new Registry;
  }
}

