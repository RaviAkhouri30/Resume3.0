import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { ViewModelContext } from 'src/app/shared-module/enums/view-model-context';
import { PersonDataModel } from 'src/app/shared-module/models/person-data-model';

@Component({
  selector: 'app-social-media',
  standalone: false,
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css',
})
export class SocialMediaComponent extends BaseComponent<PersonDataModel> implements OnInit {
  protected readonly _context: ViewModelContext = ViewModelContext.SocialMedia;

  ngOnInit(): void {
    this.intializeModel();
  }

  /**
  * Opens the provided link in a new window.
  * @param link The URL to be opened.
  */
  public openLink = (link: string): void => {
    window.open(link);
  }
}
