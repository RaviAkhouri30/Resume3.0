import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  standalone: false
})
export class HobbiesComponent extends BaseComponent<string[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.HobbiesComponent;

  ngOnInit(): void {
    this.intializeModel();
  }

}
