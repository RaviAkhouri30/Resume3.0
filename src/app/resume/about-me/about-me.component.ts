import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { AboutMeService } from './services/about-me.service';
import { PersonDataModel } from 'src/app/shared-module/models/person-data-model';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: false
})
export class AboutMeComponent extends BaseComponent<PersonDataModel> implements OnInit {

  // Define the context for the ViewModel
  protected readonly _context = ViewModelContext.AboutMeComponent;
  // Inject the AboutMeService
  private readonly _aboutMeService: AboutMeService = inject(AboutMeService);

  constructor(
    protected override injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initializeModel();
  }

  /**
   * Copies the provided data to the clipboard and shows a message.
   * @param data The data to be copied.
   * @param message The message to be displayed.
   */
  public onCopy(data: string, message: string): void {
    this._aboutMeService.copyCommand(data, message);
  }

}
