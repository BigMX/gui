import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Invitations } from '../class/invitation.service';
import { Invitation } from '../class/invitation';
import { Output } from '@angular/core';

class CreateParams {
  id: string;
}

@Component({
  selector: 'app-create-reg',
  templateUrl: './create-reg.component.html',
  styleUrls: ['./create-reg.component.css']
})
export class CreateRegComponent implements OnInit {

  account: Account;
  newRegistry: Registry;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    protected router: Router
    ) { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: CreateParams) => {
      if (params.id) {
        this.id = +params.id;
        this.users.getById(this.id).subscribe((acct) => {
          this.account = acct;
        });
      }
    });
  }

  // this method is used for adding a registry to the appropriate user (who's logged in)
  addRegistry() {
    this.newRegistry.user_id = this.id;
    this.newRegistry.status = 'active';
    this.registries.add(this.newRegistry).subscribe((registry) => {
      this.newRegistry = {};
      let url='dashboard/';
      url+=this.id;
      this.router.navigateByUrl(url);
      location.reload();
    });
  }

}
