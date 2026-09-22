import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { IApiBaseService } from '../interfaces/i-base-service';
import { GetEndPointUrl } from '../helper-functions/get-end-point-url';
import { UrlConstants } from '../constants/url-constants';
import { IHttpBackend } from '../interfaces/i-http-backend';
import { HttpsErrorHandler } from './https-error-handler';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiBaseService implements IApiBaseService {
  private readonly $https: IHttpBackend = inject(IHttpBackend);
  private readonly $httpsErrorHandler: HttpsErrorHandler = inject(HttpsErrorHandler);

  /** Retrieves the view data required by a feature service. */
  public abstract attachViewDataHandler<T>(): Observable<T>;

  /** Retrieves typed data from the configured backend endpoint. */
  public attachViewApiHandler<T>(url: UrlConstants): Observable<T> {
    return this.$httpsErrorHandler.handleHttpsError(this.$https.get<T>(GetEndPointUrl.getEndPointUrl(url))).pipe(
      filter((res) => res?.ok && res?.body !== null),
      map((res) => res.body as T)
    );
  };

}
