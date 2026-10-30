// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  // Local development uses the nested fake database by default.
  production: false,
  backend: 'fake',
  // Shared prefix; feature endpoints append section names such as `education`.
  baseUrl: 'resumes/RS-PLACEHOLDER/resume',
  firebase: {
    authDomain: 'resume-builder-f0652.firebaseapp.com',
    projectId: 'resume-builder-f0652',
    storageBucket: 'resume-builder-f0652.firebasestorage.app',
    messagingSenderId: '1002190712619',
    appId: '1:1002190712619:web:6f469add4ed4781556df6e',
    measurementId: 'G-MNR44JEJM5'
  },
  // EmailJS identifiers are public by design; abuse is limited by the
  // allowed-origins and rate-limit settings in the EmailJS dashboard.
  emailJs: {
    serviceId: 'service_g7pwa8r',
    templateId: 'template_1bvzelf',
    publicKey: '2kOpwVxV45AwOcykd'
  },
  // Photo and resume are served from Cloudinary; until `cloudName` is set the
  // bundled files in `src/assets` are used. Upload with `npm run upload:media`.
  media: {
    cloudName: '',
    profilePhotoId: 'portfolio/profile',
    resumeId: 'portfolio/Ravi_Akhouri_Resume'
  }
};
