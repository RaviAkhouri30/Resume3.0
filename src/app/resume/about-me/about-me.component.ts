import { Component, inject, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { ViewModelFactory } from 'src/app/shared-module/factories/view-model-factory';
import { IPerson } from 'src/app/shared-module/interfaces/i-person-model';
import { AboutMeService } from './services/about-me.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: false
})
export class AboutMeComponent extends BaseComponent<IPerson> implements OnInit {

  // Define the context for the ViewModel
  private readonly _context = ViewModelContext.AboutMeComponent;
  // Inject the AboutMeService
  private readonly _aboutMeService: AboutMeService = inject(AboutMeService);

  constructor(
    protected injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    // Initialize the model using the ViewModelFactory
    this.model = ViewModelFactory.getViewModelInstance(this._context, this.injector);
    // Automatically unsubscribe from observables to prevent memory leaks
    this.autoUnsubscribe();
  }

  /**
   * Copies the provided data to the clipboard and shows a message.
   * @param data The data to be copied.
   * @param message The message to be displayed.
   */
  public onCopy(data: string, message: string): void {
    this._aboutMeService.copyCommand(data, message);
  }

  /**
   * Opens the provided link in a new window.
   * @param link The URL to be opened.
   */
  public openLink = (link: string): void => {
    window.open(link);
  }

}
