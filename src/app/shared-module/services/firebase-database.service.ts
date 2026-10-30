import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore/lite';
import { environment } from 'src/environments/environment';

/** Shape of the deploy-time script `assets/firebase-config.js`. */
type RuntimeFirebaseConfig = { apiKey?: string };

/**
 * Central Firebase bootstrap for Firestore access.
 *
 * Uses the Firestore *Lite* SDK: the portfolio only performs one-off document
 * reads, so it does not need the realtime/offline machinery of the full SDK,
 * which keeps the bundle considerably smaller. Firebase Auth is not loaded
 * because the browser never writes data.
 */
@Injectable({ providedIn: 'root' })
export class FirebaseDatabaseService {
    private readonly _firestore: Firestore;

    constructor() {
        // Load the browser-only key from the deployment asset, never from source control.
        const runtimeConfig = (globalThis as typeof globalThis & {
            __FIREBASE_CONFIG__?: RuntimeFirebaseConfig;
        }).__FIREBASE_CONFIG__;

        if (!runtimeConfig?.apiKey) {
            throw new Error('Firebase runtime configuration is missing apiKey.');
        }

        const app = initializeApp({ ...environment.firebase, apiKey: runtimeConfig.apiKey });
        this._firestore = getFirestore(app);
    }

    /** Returns the Firestore instance used by the Firebase backend adapter. */
    public get fireStore(): Firestore {
        return this._firestore;
    }
}
