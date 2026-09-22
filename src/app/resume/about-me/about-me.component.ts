import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { AboutMeService } from './services/about-me.service';
import { PersonDataModel } from 'src/app/shared-module/models/person-data-model';
import { AboutMeViewModel } from './models/about-me-view-model';
import { COMMAND_CONTEXT, CommandService } from 'src/app/shared-module/services/command-service';
import { Context } from 'src/app/shared-module/enums/context';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
  providers: [
    AboutMeViewModel,
    { provide: COMMAND_CONTEXT, useValue: Context.AboutMe },
    CommandService
  ]
})
export class AboutMeComponent extends BaseComponent<PersonDataModel> implements OnInit {

  // Inject the AboutMeService
  private readonly _commandService: CommandService = inject(CommandService);
  protected readonly _aboutMeService: AboutMeService = inject(AboutMeService);

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(AboutMeViewModel);
  }

  ngOnInit(): void {
    this.inIt()
  }

  /**
   * Copies the provided data to the clipboard and shows a message.
   * @param data The data to be copied.
   * @param message The message to be displayed.
   */
  public onCopy(data: string, message: string): void {
    this._commandService.copyCommand(data, message);
  }

}
