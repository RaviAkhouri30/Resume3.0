import { inject, Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { Context } from 'src/app/shared-module/enums/context';
import { HandleErrorFactory } from 'src/app/shared-module/factories/handle-error-factory';
import { IFakeHttps } from 'src/app/shared-module/interfaces/i-fake-https';
import { BaseService } from 'src/app/shared-module/services/base.service';
// import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService extends BaseService {

  private readonly _http: IFakeHttps = inject(IFakeHttps);
  private readonly _handleErrorFactory: HandleErrorFactory = inject(HandleErrorFactory);

  constructor() {
    super(Context.aboutMe);
  }

  override attachViewApiHandler<T>(): Observable<T> {
    return this._handleErrorFactory.handleHttpsError(this._http.get<T>('about-me')).pipe(
      filter((res) => res.ok && res.body !== null),
      map((res) => res.body as T)
    );
  }

}
