import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { Context } from 'src/app/shared-module/enums/context';
import { HandleErrorFactory } from 'src/app/shared-module/factories/handle-error-factory';
import { GetEndPointUrl } from 'src/app/shared-module/functions/get-end-point-url';
import { IFakeHttps as IHttps } from 'src/app/shared-module/interfaces/i-fake-https';
import { BaseService } from 'src/app/shared-module/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsExperienceService extends BaseService {

  private readonly _http: IHttps = inject(IHttps);
  private readonly _handleErrorFactory: HandleErrorFactory = inject(HandleErrorFactory);

  constructor() {
    super(Context.ProjectsExperience);
  }

  override attachViewApiHandler<T>(): Observable<T> {
    return this._handleErrorFactory.handleHttpsError(this._http.get<T>(GetEndPointUrl.getEndPointUrl(UrlConstants.projectsExperience))).pipe(
      filter((res) => res?.ok && res?.body !== null),
      map((res) => res.body as T)
    );
  }

}
