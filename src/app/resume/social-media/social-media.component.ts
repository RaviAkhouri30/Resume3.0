import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { BaseComponent } from 'src/app/shared-module/components/base-component/base-component';
import { PersonDataModel } from 'src/app/shared-module/models/person-data-model';
import { SocialMediaModel } from './models/social-media-model';

@Component({
  selector: 'app-social-media',
  standalone: false,
  templateUrl: './social-media.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './social-media.component.css',
})
export class SocialMediaComponent extends BaseComponent<PersonDataModel> implements OnInit {

  constructor() {
    super();
    // The component selects its model; BaseComponent manages its subscription.
    this.model = inject(SocialMediaModel);
  }

  ngOnInit(): void {
    this.inIt();
  }

  /**
  * Opens the provided link in a new window.
  * @param link The URL to be opened.
  */
  public openLink = (link: string): void => {
    window.open(link);
  }
}
