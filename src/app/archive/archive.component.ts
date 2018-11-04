import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;
  archived: Registry[];
  id = 2;
  regId: number;

  constructor(
    private registries: Registries
  ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registries.getRegistries(this.id).subscribe((registry) => {
      this.registry = registry;
    });
    this.registries.getArchivedRegs(this.id).subscribe((registry) => {
      this.archived = registry;
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

  archive() {
    this.registries.getRegById(this.regId).subscribe((registry) => {
      this.newRegistry = registry;
      this.newRegistry.status = 'archived';
      console.log(this.newRegistry);
      this.registries.deleteReg(this.newRegistry.id).subscribe((registry) => {
      });
      this.registries.add(this.newRegistry).subscribe((registry) => {
      });
      this.archived.push(this.newRegistry);
    });
    this.newRegistry = {};
  }
}

