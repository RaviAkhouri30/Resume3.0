import { environment } from "src/environments/environment";
import { FakeHttpsService } from "../services/fake-https.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

export class ServiceProviderFactory {
    // Factory method to provide the appropriate HTTP service based on the environment
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
