import { EnvironmentProviders, makeEnvironmentProviders, Type } from "@angular/core";
import { environment } from "src/environments/environment";
import { BackendKind } from "src/environments/i-environment";
import { IHttpBackend } from "../interfaces/i-http-backend";
import { FakeHttpsService } from "../services/fake-https.service";
import { FirebaseBackendService } from "../services/firebase-backend.service";

/** Registry of backend adapters; adding a backend means adding one entry here. */
const BACKENDS: Record<BackendKind, Type<IHttpBackend>> = {
    fake: FakeHttpsService,
    firebase: FirebaseBackendService
};

/**
 * Binds the `IHttpBackend` abstraction to the adapter selected by the environment,
 * so feature services depend only on the abstraction (Dependency Inversion).
 */
export function provideHttpBackend(kind: BackendKind = environment.backend): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: IHttpBackend, useClass: BACKENDS[kind] }
    ]);
}
