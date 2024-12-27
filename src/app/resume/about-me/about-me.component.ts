import { Component, Injector, OnInit } from '@angular/core';
import { IViewModel } from 'src/app/shared-module/interfaces/i-view-model';
import { AboutMeViewModel } from './models/about-me-view-model';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: false
})
export class AboutMeComponent extends BaseComponent implements OnInit {

  email = "ravi.akhouri@gmail.com"

  constructor(
    protected override injector: Injector
  ) { 
    super(injector);
  }

  ngOnInit(): void {
    this.model = new AboutMeViewModel(this.injector);
    this.autoUnsubscribe();
  }

}
