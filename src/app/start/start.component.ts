import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  message: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.message="赠人玫瑰 手有余香";
  }

  change() {
    if(this.message=="赠人玫瑰 手有余香"){
      this.message="Gifts of roses, hand a fragrance";
    }else{
      this.message="赠人玫瑰 手有余香";
    }
  }
}
