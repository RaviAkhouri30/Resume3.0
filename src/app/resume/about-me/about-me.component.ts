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

  private readonly context = ViewModelContext.AboutMeComponent;
  private readonly _aboutMeService: AboutMeService = inject(AboutMeService);

  constructor(
    protected injector: Injector
  ) {
    super();
  }

  ngOnInit(): void {
    this.model = ViewModelFactory.getViewModelInstance(this.context, this.injector);
    this.autoUnsubscribe();
  }

  public onCopy(data: string, message: string): void {
    this._aboutMeService.copyCommand(data, message);
  }

  public openLink = (link: string): void => {
    window.open(link);
  }

}
