import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';
import { IntroductionService } from './services/introduction.service';
import { IntroductionViewModel } from './models/introduction-view-model';

@Component({
  selector: 'app-introduction',
  standalone: false,
  templateUrl: './introduction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent extends BaseComponent<IPersonDataModel> implements OnInit {

  private readonly introductionService: IntroductionService = inject(IntroductionService);

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(IntroductionViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  public downloadResume() {
    this.introductionService.downloadCommand('assets/RAVI_AKHOURI_PDF.pdf', 'RAVI_AKHOURI');
  }

}
