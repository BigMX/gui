import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Item } from '../class/item';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Cart } from '../class/cart.service';

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
  itemCount: number;
  account: Account;
  registry: Registry[];
  newRegistry: Registry;
  id: number;
  name: string;
  notifCount: number;
  regId: number;
  tempAccount: Account;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    private carts: Cart,
  ) { }

  // initialize everything - alll important things needed
  ngOnInit() {
    this.newRegistry = new Registry;
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.userid) {
        this.id = +params.userid;
        this.regId = +params.regid;
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
            this.carts.getItems(this.id).subscribe((items) => {
              this.itemCount = items.length;
            });
        });
      }
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
          console.log(registry);
          this.currentReg = registry[0];
          this.name = this.currentReg.name;
          this.carts.getItemsByReg(+params.regid).subscribe((x)=> {
            this.itemList=x;
            console.log(this.itemList);
          });
        });
      }
    });
  }

  // this is used for claiming an item
  claim(index: number) {
    this.carts.claimItem(this.itemList[index].item_id,this.id).subscribe((x)=> {

    });
    this.itemList[index].status='Claimed';
  }
}
