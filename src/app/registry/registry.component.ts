import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';

class RegistryParams {
  userid: string;
  regid: string;
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
  id: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.userid) {
        this.id = +params.userid;
        this.registries.getRegistries(this.id).subscribe((registry) => {
          this.registry = registry;
        });
      }
    });
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
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
      if (params.regid) {
        this.registries.deleteReg(+params.regid).subscribe((registry) => {
        });
      }
    });
  }

}
