import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Registry } from '../class/registry';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  registry: Registry[];
  newRegistry: Registry;

  constructor() { }

  ngOnInit() {
    this.newRegistry = new Registry;
    this.registry = [];
  }

  addRegistry() {
    this.registry.push(this.newRegistry);
    this.newRegistry = new Registry;
  }
}
