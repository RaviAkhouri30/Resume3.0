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
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: IFakeHttps,
      useFactory: ServiceProviderFactory.httpsServiceFactory,
      deps: [HttpHandler]
    },
    provideAnimationsAsync()
  ]
})
export class AppModule { }
