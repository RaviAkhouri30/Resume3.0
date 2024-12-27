import { HttpHandler, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IFakeHttps } from './shared-module/interfaces/i-fake-https';
import { ServiceProviderFactory } from './shared-module/factories/service-provider-factory';


@NgModule({
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: IFakeHttps,
      useFactory: ServiceProviderFactory.httpsServiceFactory,
      deps: [HttpHandler]
    }
  ]
})
export class AppModule { }
