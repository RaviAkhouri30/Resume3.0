import { environment } from "src/environments/environment";
import { FakeHttpsService } from "../services/fake-https.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { FirebaseBackendService } from "../services/firebase-backend.service";

/**
 * Selects the concrete backend implementation for the current environment.
 *
 * This preserves the application-level abstraction while allowing local mock data,
 * Firebase Firestore, or the standard Angular HTTP client to be chosen at runtime.
 */
export class ServiceProviderFactory {
    /** Returns the active backend implementation for the configured environment. */
    static httpsServiceFactory(
        _httpHanlder: HttpHandler
    ) {
        // Keep the mock backend available for local/offline development and demos.
        if (environment.fakeBackend) {
            return new FakeHttpsService();
        }

        // Prefer the Firestore-backed adapter when the project is configured for Firebase.
        if (environment.firebaseBackend) {
            return new FirebaseBackendService();
        }

        // Fall back to Angular's built-in HttpClient for standard API access.
        return new HttpClient(_httpHanlder);
    }
}
