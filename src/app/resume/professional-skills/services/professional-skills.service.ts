import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { Context } from 'src/app/shared-module/enums/context';
import { HandleErrorFactory } from 'src/app/shared-module/factories/handle-error-factory';
import { GetEndPointUrl } from 'src/app/shared-module/functions/get-end-point-url';
import { IFakeHttps as IHttps } from 'src/app/shared-module/interfaces/i-fake-https';
import { BaseService } from 'src/app/shared-module/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalSkillsService extends BaseService{

  // Inject dependencies
  private readonly _http: IHttps = inject(IHttps);
  private readonly _handleErrorFactory: HandleErrorFactory = inject(HandleErrorFactory);

  // Constructor to initialize the base service with the context
  constructor() {
    super(Context.ProfessionalSkills);
  }

  // Override method to attach view API handler
  override attachViewApiHandler<T>(): Observable<T> {
    return this._handleErrorFactory.handleHttpsError(this._http.get<T>(GetEndPointUrl.getEndPointUrl(UrlConstants.skills))).pipe(
      // Filter the response to ensure it is okay and has a body
      filter((res) => res?.ok && res?.body !== null),
      // Map the response body to the expected type
      map((res) => res.body as T)
    );
  }
}
