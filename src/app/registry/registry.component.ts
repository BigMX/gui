import { Invitations } from './../class/invitation.service';
import { Component, OnInit, ViewRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';
import { Registries } from '../class/registries.service';
import { Item } from '../class/item';
import { Account } from '../class/account';
import { User } from '../class/user.service';
import { Viewer } from '../class/viewers';
import { Invitation } from '../class/invitation';
import { Cart } from '../class/cart.service';

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
  itemCount: number;
  unassignedcart: Item[] = [];
  assigneditems: Item[]=[];
  name: string;
  item: Item;
  length: number;
  itemList: Item[] = [];
  account: Account;
  registry: Registry[];
  newRegistry: Registry;
  id: number;
  notifCount: number;
  viewers: Account[];
  views: number;
  invites: Invitation[];
  isDisable = false;
  deleteInv: Invitation;

  constructor(
    private route: ActivatedRoute,
    private registries: Registries,
    private users: User,
    private invitations: Invitations,
    private carts: Cart
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
            this.carts.getItems(this.id).subscribe((items)=> {
              console.log(items);
              this.cart=items;
              this.itemCount = items.length;
              for( const c of this.cart) {
                if(!c.registry_id) {
                  this.unassignedcart.push(c);

                }
              }
            });
        });
        this.carts.getItems(this.id).subscribe((items) => {
          this.cart = items;
          console.log(this.cart);
        })
      }
      if (params.regid) {
        this.registries.getRegById(+params.regid).subscribe((registry) => {
          this.currentReg = registry[0];
          // if (this.currentReg.items !== undefined && this.currentReg.items.length > 0) {
            // this.length = this.currentReg.items.length;
            // this.itemList = this.currentReg.items;
          // }
          this.name = this.currentReg.name;
          this.carts.getItemsByReg(this.currentReg.registry_id).subscribe((its)=> {
            this.assigneditems=its;
            console.log(its);
          });
        });
      }
      console.log(+params.regid);
      const rid= +params.regid;
      this.users.getViewer(rid).subscribe((viewers) => {
        this.viewers=viewers;
        this.views = viewers.length;
        console.log(this.viewers);
      });
    });
  }

  onDisableUser() {
    this.isDisable = true;
  }

  // this method deletes a registry
  deleteRegistry() {
    this.route.params.subscribe((params: RegistryParams) => {
      if (params.regid) {
        this.registries.deleteReg(+params.regid).subscribe((registry) => {
          location.reload();
        });
      }
    });
  }

  // this method makes sure that no duplicate items are added to a registry
  arrayObjectIndexOf(myArray, searchTerm) {
    let i;
    for(i = 0; i < myArray.length; i++) {
        if (myArray[i].name === searchTerm.name) {
          return i;
        }
    }
    return -1;
  }

  // this method is for when the checkbox is clicked on - for adding an item to a registry
  addItem(event: boolean, item: Item) {
    if(event) {
      if(this.itemList !== undefined) {
        if (this.arrayObjectIndexOf(this.itemList, item) === -1) {
          const index = this.arrayObjectIndexOf(this.cart, item);
          item.disabled = 'true';
          this.itemList.push(item);
        }
      }
    } else {
        const index2 = this.itemList.indexOf(item);
        this.itemList.splice(index2,1);
    }
  }

  // this method is for when the user clicks on the 'add item(s) button' - data binding actually occurs
  addItems() {
    // this.currentReg.items = this.itemList;
    console.log(this.itemList);

    for( const it of this.itemList) {
      const index= this.itemList.indexOf(it);
      this.unassignedcart.splice(index,1);
      it.registry_id=this.currentReg.registry_id;
      this.assigneditems.push(it);
      this.carts.addItemToRegisty(it).subscribe((x)=> {
        console.log(x);
      });
    }
    // this.registries.updateReg(this.currentReg).subscribe((reg) => {
    //   this.itemList = reg.items;
    // });
    // location.reload();
  }

  removeUserFromReg(index: number) {
    this.deleteInv=new Invitation;
    this.deleteInv.receiverEmail=this.viewers[index].email;
    this.invitations.deleteByEmail(this.deleteInv).subscribe((x) => {
      console.log(x);
    });
    this.viewers.splice(index, 1);
    // this.currentReg.viewers = this.viewers;
  }
}
