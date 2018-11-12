import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from './../class/registries.service';
import {Invitations} from './../class/invitation.service';
import { Invitation } from '../class/invitation';

class InviteParams {
  id: string;
}

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;
  id: number;
  registryId: number;
  newInvitation: Invitation;
  code: string;
  show: boolean;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private invitations: Invitations
  ) { }

  // important variables initialized
  ngOnInit() {
    this.newRegistry = new Registry;
    this.newInvitation=new Invitation;
    this.show=true;
    this.route.params.subscribe((params: InviteParams) => {
      if (params.id) {
        this.id = +params.id;
        this.registries.getRegistries(this.id).subscribe((registry) => {
          this.registry = registry;
        });
      }
    });
  }

  change(id: number) {
    this.registryId=id;
  }


  invite() {
    this.newInvitation.status=false;
    this.newInvitation.registryId=this.registryId;
    this.newInvitation.Code='Code'+this.newInvitation.registryId;
    this.code=this.newInvitation.Code;
    this.invitations.add(this.newInvitation).subscribe((x) => {
      this.newInvitation=new Invitation;
      this.show=false;
    });
  }

}
