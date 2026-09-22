import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPersonDataModel } from 'src/app/shared-module/interfaces/i-person-data-model';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';
import { CommonService } from 'src/app/shared-module/services/common.service';

@Injectable({
  providedIn: 'root',
})
export class IntroductionService extends ApiBaseService {

  private readonly _commonService: CommonService = inject(CommonService);

  public override attachViewDataHandler<T = IPersonDataModel>(): Observable<T> {
    return this._commonService.aboutMeData.pipe(
      map((data) => data as T)
    );
  }

}
