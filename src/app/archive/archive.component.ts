import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';

class ArchiveParams {
  id: string;
}

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;
  archived: Registry[];
  id: number;
  regId: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries
  ) { }

  // important variables initialized
  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: ArchiveParams) => {
      if (params.id) {
        this.id = +params.id;
        this.registries.getRegistries(this.id).subscribe((registry_) => {
          this.registry = registry_;
        });
        this.registries.getArchivedRegs(this.id).subscribe((registry_) => {
          this.archived = registry_;
        });
      }
    });
  }

  // this method archives a registry - changed it's status to archived
  archive() {
    this.registries.getRegById(this.regId).subscribe((registry) => {
      this.newRegistry = registry;
      this.newRegistry.status = 'archived';
      console.log(this.newRegistry);
      this.registries.updateReg(this.newRegistry).subscribe(() => {
      });
      this.archived.push(this.newRegistry);
    });
    this.newRegistry = {};
  }
}

