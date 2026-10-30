import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UrlConstants } from '../constants/url-constants';
import { IHttpBackend } from '../interfaces/i-http-backend';
import { HttpsErrorHandler } from './https-error-handler';

/**
 * Base class for read-only feature data services (Template Method pattern).
 *
 * A concrete service only declares its endpoint and payload type; fetching,
 * loading state and error handling are inherited. The payload type is fixed by
 * the subclass, so callers cannot request an arbitrary `T` from an endpoint.
 */
export abstract class ApiBaseService<T> {
  private readonly backend: IHttpBackend = inject(IHttpBackend);
  private readonly errorHandler: HttpsErrorHandler = inject(HttpsErrorHandler);

  /** Resume section that this service reads. */
  protected abstract readonly endpoint: UrlConstants;

  /** Retrieves the view data for this feature from the configured backend. */
  public attachViewDataHandler(): Observable<T> {
    return this.errorHandler.handleHttpsError(this.backend.get<T>(`${environment.baseUrl}/${this.endpoint}`));
  }
}
