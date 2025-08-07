import { HttpHandler, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IFakeHttps } from './shared-module/interfaces/i-fake-https';
import { ServiceProviderFactory } from './shared-module/factories/service-provider-factory';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  // Declare the components that belong to this module
  declarations: [
    AppComponent // The root component of the application
  ],
  // Specify the root component to bootstrap the application
  bootstrap: [
    AppComponent
  ],
  // Import other Angular modules and third-party modules
  imports: [
    BrowserModule, // Provides services that are essential to launch and run a browser app
    AppRoutingModule, // Handles routing for the application
    MatProgressSpinnerModule // Angular Material module for progress spinner UI component
  ],
  // Define the services and providers available in this module
  providers: [
    provideHttpClient(withInterceptorsFromDi()), // Configures the HTTP client with dependency injection-based interceptors
    {
      provide: IFakeHttps, // Token for a custom HTTP service
      useFactory: ServiceProviderFactory.httpsServiceFactory, // Factory function to create the service
      deps: [HttpHandler] // Dependencies required by the factory function
    },
    provideAnimationsAsync() // Asynchronous provider for enabling animations
  ]
})
export class AppModule { }
