import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Item } from '../class/item';
import { Account } from '../class/account';
import { User } from '../class/user.service';

class RegistryParams {
  userid: string;
  regid: string;
  notifCount: number;
}

@Component({
  selector: 'app-view-registry',
  templateUrl: './view-registry.component.html',
  styleUrls: ['./view-registry.component.css']
})
export class ViewRegistryComponent implements OnInit {

  currentReg: Registry;
  item: Item;
  itemList: Item[] = [];
  account: Account;
  registry: Registry[];
  newRegistry: Registry;
  id: number;
  name: string;
  notifCount: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User
  ) { }

  // initialize everything - alll important things needed
  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.userid) {
        this.id = +params.userid;
        this.registries.getRegistries(this.id).subscribe((registry) => {
          this.registry = registry;
        });
        this.users.getById(this.id).subscribe((account) => {
          this.account = account;
          if(this.account.notifications !== undefined) {
            this.notifCount = this.account.notifications.length;
            } else {
              this.notifCount = 0;
            }
        });
      }
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
          this.currentReg = registry;
          this.itemList = this.currentReg.items;
          console.log(this.itemList);
          this.name = this.currentReg.name;
        });
      }
    });
  }

}
