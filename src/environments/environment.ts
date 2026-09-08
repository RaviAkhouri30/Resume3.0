// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // Local development uses the nested fake database by default.
  production: false,
  fakeBackend: true,
  firebaseBackend: false,
  // Shared prefix; feature endpoints append section names such as `education`.
  baseUrl: 'resumes/RS-PLACEHOLDER/resume',
  firebase: {
    apiKey: 'AIzaSyARu-OaWZYUK6qA9ONoq8YDGp8oljKMjis',
    authDomain: 'resume-builder-f0652.firebaseapp.com',
    projectId: 'resume-builder-f0652',
    storageBucket: 'resume-builder-f0652.firebasestorage.app',
    messagingSenderId: '1002190712619',
    appId: '1:1002190712619:web:6f469add4ed4781556df6e',
    measurementId: 'G-MNR44JEJM5'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
