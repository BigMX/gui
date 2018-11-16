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
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  currentReg: Registry;
  cart: Item[] = [];
  name: string;
  item: Item;
  length: number;
  itemList: Item[] = [];
  adding: Item[] = [];
  account: Account;
  registry: Registry[];
  newRegistry: Registry;
  id: number;
  notifCount: number;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User
  ) { }

  // important variables initialized
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
          this.cart = account.cart;
        });
      }
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
          this.currentReg = registry;
          if (this.currentReg.items !== undefined && this.currentReg.items.length > 0) {
            this.length = this.currentReg.items.length;
            this.itemList = this.currentReg.items;
          }
          this.name = this.currentReg.name;
        });
      }
    });
  }

  // this method deletes a registry
  deleteRegistry() {
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.regid) {
        this.registries.deleteReg(+params.regid).subscribe((registry) => {
        });
      }
    });
  }

  addItem(event: boolean, item: Item) {
    if(event) {
      this.adding = this.currentReg.items;
      this.adding.push(item);
      console.log(this.adding);
    } else {
      const index2 = this.adding.indexOf(item);
      this.adding.splice(index2,1);
    }
  }

  addItems() {
    this.currentReg.items = this.adding;
    console.log(this.currentReg);
    this.registries.updateReg(this.currentReg).subscribe(() => {
    });
    location.reload();
  }
}
