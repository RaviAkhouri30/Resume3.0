import { IEnvironment } from './i-environment';

export const environment: IEnvironment = {
  // Production reads the same resume path from Firestore.
  production: true,
  backend: 'firebase',
  // Feature endpoints append section names to this Firestore document prefix.
  baseUrl: 'resumes/RS-1/resume',
  firebase: {
    authDomain: 'resume-builder-f0652.firebaseapp.com',
    projectId: 'resume-builder-f0652',
    storageBucket: 'resume-builder-f0652.firebasestorage.app',
    messagingSenderId: '1002190712619',
    appId: '1:1002190712619:web:6f469add4ed4781556df6e',
    measurementId: 'G-MNR44JEJM5'
  },
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
