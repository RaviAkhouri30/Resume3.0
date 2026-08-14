import { Component, inject } from '@angular/core';
import { LoaderService } from './shared-module/services/loader-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
/** Root component that exposes the global loading state to its template. */
export class AppComponent { 

  private loaderService: LoaderService = inject(LoaderService);

  /** Returns whether the application loader should be visible. */
  public isLoaderActive(): boolean {
    return this.loaderService.isLoading;
  }

}
