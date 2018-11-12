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
  name: string;
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
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
          this.currentReg = registry;
          this.name = this.currentReg.name;
        });
      }
    });
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
