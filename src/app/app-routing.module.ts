/**
 * AppRoutingModule is responsible for configuring the application's routing.
 * It defines the routes and their corresponding lazy-loaded modules, as well as
 * the location strategy for handling URLs.
 *
 * Routes:
 * - '' (empty path): Redirects to the 'home' route.
 * - 'home': Lazy-loads the ResumeModule.
 * - '**' (wildcard): Redirects to the 'home' route for undefined paths.
 *
 * Providers:
 * - Location: Angular's service for interacting with the browser's URL.
 * - LocationStrategy: Configured to use HashLocationStrategy, which appends a hash (#)
 *   to the URL for routing purposes. This is useful for environments where the server
 *   does not support HTML5 push-state routing.
 *
 * Imports:
 * - RouterModule.forRoot(routes): Configures the router at the application's root level
 *   with the defined routes.
 *
 * Exports:
 * - RouterModule: Makes the router directives available for use in other modules.
 */
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./resume/resume.module').then(m => m.ResumeModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
