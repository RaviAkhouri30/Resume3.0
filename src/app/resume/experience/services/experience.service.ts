import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService extends ApiBaseService {

  // Override method to attach view API handler
  override attachViewDataHandler<T>(): Observable<T> {
    return this.attachViewApiHandler(UrlConstants.experience);
  }

}
