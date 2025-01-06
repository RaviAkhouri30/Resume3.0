import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';

@Component({
  selector: 'app-awards-and-achievements',
  templateUrl: './awards-and-achievements.component.html',
  styleUrl: './awards-and-achievements.component.css',
  standalone: false
})
export class AwardsAndAchievementsComponent extends BaseComponent<string[]> implements OnInit {
  protected override _context: ViewModelContext = ViewModelContext.AwardsAndAchievementsComponent;

  ngOnInit(): void {
    this.intializeModel();
  }

}
