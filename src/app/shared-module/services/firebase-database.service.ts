import { Service } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Central Firebase bootstrap used by the app for authentication and Firestore access.
 *
 * This service keeps the Firebase SDK initialization in one place so backend
 * features can consume a consistent app instance without repeating connection logic.
 */
const firebaseConfig = {
    apiKey: 'AIzaSyARu-OaWZYUK6qA9ONoq8YDGp8oljKMjis',
    authDomain: 'resume-builder-f0652.firebaseapp.com',
    projectId: 'resume-builder-f0652',
    storageBucket: 'resume-builder-f0652.firebasestorage.app',
    messagingSenderId: '1002190712619',
    appId: '1:1002190712619:web:6f469add4ed4781556df6e',
    measurementId: 'G-MNR44JEJM5'
};

@Service()
export class FirebaseDatabaseService {
    private readonly _app: FirebaseApp;
    private readonly _auth: Auth;
    private readonly _firestore: Firestore;

    constructor() {
        // Initialize the application once so Auth and Firestore share the same project context.
        this._app = initializeApp(firebaseConfig);
        this._auth = getAuth(this._app);
        this._firestore = getFirestore(this._app);
    }

    /** Returns the Firestore instance used by the Firebase backend adapter. */
    public get fireStore(): Firestore {
        return this._firestore;
    }

    /** Returns the Firebase Auth instance for user/session operations. */
    public get auth(): Auth {
        return this._auth;
    }

    /** Returns the root Firebase app instance for advanced initialization or diagnostics. */
    public get app(): FirebaseApp {
        return this._app;
    }
}
