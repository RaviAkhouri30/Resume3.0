import { environment } from "src/environments/environment";
import { FakeHttpsService } from "../services/fake-https.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

/** Creates the HTTP implementation configured for the current environment. */
export class ServiceProviderFactory {
    /** Returns the fake JSON-backed client or Angular's HttpClient. */
    static httpsServiceFactory(
        _httpHanlder: HttpHandler
    ) {
        // If the fake backend is enabled, return the FakeHttpsService
        if (environment.fakeBackend) {
            return new FakeHttpsService();
        }
        // Otherwise, return the standard HttpClient
        return new HttpClient(_httpHanlder);
    }
}
