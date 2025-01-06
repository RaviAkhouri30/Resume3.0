import { Component, inject } from '@angular/core';
import { LoaderService } from './shared-module/services/loader-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent { 

  public loaderService: LoaderService = inject(LoaderService);

  public isLoaderActive(): boolean {
    return this.loaderService.isLoading;
  }

}
