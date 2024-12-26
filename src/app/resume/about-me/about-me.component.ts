import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-me',
    templateUrl: './about-me.component.html',
    styleUrls: ['./about-me.component.css'],
    standalone: false
})
export class AboutMeComponent implements OnInit {

  email = "ravi.akhouri@gmail.com"
  constructor() { }

  ngOnInit(): void {
  }

}
