import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';
import { IntroductionViewModel } from './models/introduction-view-model';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';
import { Context } from 'src/app/shared-module/enums/context';

@Component({
  selector: 'app-introduction',
  standalone: false,
  templateUrl: './introduction.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './introduction.component.css',
  providers: [
    { provide: COMMAND_CONTEXT, useValue: Context.Introduction },
    CommandService
  ]
})
export class IntroductionComponent extends BaseComponent<IPersonDataModel> implements OnInit {

  private readonly commandService: CommandService = inject(CommandService);

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(IntroductionViewModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  public downloadResume() {
    this.commandService.downloadCommand('assets/RAVI_AKHOURI_PDF.pdf', 'RAVI_AKHOURI');
  }

}
