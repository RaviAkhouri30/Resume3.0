import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';
import { IntroductionService } from './services/introduction.service';

@Component({
  selector: 'app-introduction',
  standalone: false,
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent extends BaseComponent<IPersonDataModel> implements OnInit {

  private readonly introductionService: IntroductionService = inject(IntroductionService);
  protected readonly _context: ViewModelContext = ViewModelContext.IntroductionComponent;

  constructor(
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.intializeModel();
  }

  public downloadResume() {
    this.introductionService.downloadCommand('assets/RAVI_AKHOURI_PDF.pdf', 'RAVI_AKHOURI');
  }

}
