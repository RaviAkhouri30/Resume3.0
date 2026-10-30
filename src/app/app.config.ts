import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideHttpBackend } from './shared-module/providers/provide-http-backend';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    // Swaps the fake JSON backend and Firestore without touching feature code.
    provideHttpBackend()
  ]
};
