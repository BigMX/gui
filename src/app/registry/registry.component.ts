import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';

class RegistryParams {
  id: string;
}

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  currentReg: Registry;
  registry: Registry[];
  newRegistry: Registry;
  id = 2;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registries.getRegistries(this.id).subscribe((registry) => {
      this.registry = registry;
    });
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.id) {
        this.registries.getRegById(+params.id).subscribe((registry) => {
          this.currentReg = registry;
        });
      }
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

  deleteRegistry() {
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.id) {
        this.registries.deleteReg(+params.id).subscribe((registry) => {
        });
      }
    });
  }

}
