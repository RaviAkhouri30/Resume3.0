import { Service } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';

/**
 * Central Firebase bootstrap used by the app for authentication and Firestore access.
 *
 * This service keeps the Firebase SDK initialization in one place so backend
 * features can consume a consistent app instance without repeating connection logic.
 */
@Service()
export class FirebaseDatabaseService {
    private readonly _app: FirebaseApp;
    private readonly _auth: Auth;
    private readonly _firestore: Firestore;

    constructor() {
        // Load the browser-only key from the deployment asset, never from source control.
        const runtimeConfig = (globalThis as typeof globalThis & {
            __FIREBASE_CONFIG__?: Partial<typeof environment.firebase> & { apiKey?: string };
        }).__FIREBASE_CONFIG__;
        const firebaseConfig = {
            ...environment.firebase,
            ...runtimeConfig
        } as typeof environment.firebase & { apiKey?: string };

        if (!firebaseConfig.apiKey) {
            throw new Error('Firebase runtime configuration is missing apiKey.');
        }

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
