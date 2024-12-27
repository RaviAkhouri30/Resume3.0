import { environment } from "src/environments/environment";
import { FakeHttpsService } from "../services/fake-https.service";
import { HttpClient, HttpHandler } from "@angular/common/http";

export class ServiceProviderFactory {
    static httpsServiceFactory(
        _httpHanlder: HttpHandler
    ) {
        if (environment.fakeBackend) {
            return new FakeHttpsService();
        }
        return new HttpClient(_httpHanlder);
    }
}
