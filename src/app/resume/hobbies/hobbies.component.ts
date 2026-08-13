import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { Hobbies } from 'src/app/shared-module/models/hobbies';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.css',
  standalone: false
})
export class HobbiesComponent extends BaseComponent<Hobbies[]> implements OnInit {

  protected override _context: ViewModelContext = ViewModelContext.HobbiesComponent;

  ngOnInit(): void {
    this.initializeModel();
  }

}
