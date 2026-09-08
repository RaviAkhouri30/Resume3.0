export const environment = {
  // Production reads the same resume path from Firestore.
  production: true,
  fakeBackend: false,
  firebaseBackend: true,
  // Feature endpoints append section names to this Firestore document prefix.
  baseUrl: 'resumes/RS-1/resume',
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
