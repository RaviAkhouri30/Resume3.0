import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlConstants } from 'src/app/shared-module/constants/url-constants';
import { ApiBaseService } from 'src/app/shared-module/services/api-base.service';

@Injectable({
  providedIn: 'root',
})
export class HobbiesService extends ApiBaseService {

  public override attachViewDataHandler<T>(): Observable<T> {
    return this.attachViewApiHandler(UrlConstants.hobbies);
  }

}
