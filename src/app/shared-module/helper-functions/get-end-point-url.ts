import { environment } from "src/environments/environment";

export class GetEndPointUrl {
    static getEndPointUrl(url: string): string {
        return `${environment.baseUrl}/${url}`;
    }
}
