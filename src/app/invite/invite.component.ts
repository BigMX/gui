import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;
  id = 2;

  constructor(
    private registries: Registries
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registries.getRegistries(this.id).subscribe((registry) => {
      this.registry = registry;
    });
  }

  addRegistry() {
    this.newRegistry.userId = this.id;
    this.newRegistry.status = 'active';
    this.registries.add(this.newRegistry).subscribe((registry) => {
    });
    this.registries.getRegistries(this.id).subscribe((registry) => {
      this.registry = registry;
    });
    this.newRegistry = {};
  }
}
