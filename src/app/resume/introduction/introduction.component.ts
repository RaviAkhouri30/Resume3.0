import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';

@Component({
  selector: 'app-introduction',
  standalone: false,
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css',
})
export class IntroductionComponent extends BaseComponent<IPersonDataModel> implements OnInit {

  protected readonly _context: ViewModelContext = ViewModelContext.IntroductionComponent;

  constructor(
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.intializeModel();
  }

  public downloadResume = (): void => {
    const link = document.createElement('a');
    link.href = 'assets/MyResumeLatestPdf.pdf';
    link.download = 'RaviAkhouriResume.pdf';
    link.click();
  }

}
